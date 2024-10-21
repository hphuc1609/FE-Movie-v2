'use client'

import { convertToPathname } from '@/helpers/cleanString'
import openRandomAdLink from '@/helpers/handle-ads'
import scrollToSection from '@/helpers/scroll-to-section'
import { cn } from '@/lib/utils'
import { DetailResponse } from '@/models/interfaces/detail'
import { Lightbulb, LightbulbOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import PlayButton from '../common/play-button'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

interface MoviePlayerProps {
  dataEpisode: DetailResponse['episodes']
  detail: DetailResponse['movie']
}

export default function MoviePlayer(props: MoviePlayerProps) {
  const { dataEpisode, detail } = props
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const router = useRouter()

  const searchParams = useSearchParams()
  const episodeParam = searchParams.get('episode') as string
  const langParam = searchParams.get('lang') as string

  const [urlVideo, setUrlVideo] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [serverIndex, setServerIndex] = useState('server 1')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [autoNextEpisode, setAutoNextEpisode] = useState(true)

  const normalizeSlug = (slug: string) => slug?.replace(/^tap-0*/, 'tap-')

  // Handle render video url by server
  useEffect(() => {
    const episodeData = dataEpisode.flatMap((episode) => {
      const matchedData = episode.server_data.find(
        (item) => normalizeSlug(item.slug) === normalizeSlug(episodeParam),
      )
      return matchedData
        ? {
            server: episode.server_name.match(/\((.*?)\)/)?.[1],
            data: matchedData,
          }
        : []
    })

    const linkVideo = episodeData.filter(
      (item) => convertToPathname(item.server as string) === langParam,
    )[0]?.data

    let video = ''
    if (episodeData.length > 0) {
      switch (serverIndex) {
        case 'server 1':
          video = linkVideo?.link_embed || episodeData[0].data?.link_embed || ''
          break
        case 'server 2':
          video = linkVideo?.link_m3u8 || episodeData[0].data?.link_m3u8 || ''
          break
        default:
          break
      }
    }

    setUrlVideo(video)
  }, [dataEpisode, serverIndex, episodeParam, langParam])

  // Scroll to player section when urlVideo change
  useEffect(() => {
    if (!episodeParam) return

    const playerElement = document.getElementById('player')
    if (playerElement) scrollToSection(playerElement)
  }, [episodeParam, urlVideo])

  // ------------------ Handler Actions ----------------------------
  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
  }

  const handleEpisodeClick = (episode: string, lang: string) => {
    openRandomAdLink()
    router.push(`?lang=${convertToPathname(lang)}&episode=${episode}`)
  }

  const handleNextEpisode = () => {
    const currentEpisodeIndex = dataEpisode.flatMap((episode) =>
      episode.server_data.findIndex(
        (item) => normalizeSlug(item.slug) === normalizeSlug(episodeParam),
      ),
    )[0]

    const nextEpisode = dataEpisode.flatMap(
      (episode) => episode.server_data[currentEpisodeIndex + 1],
    )[0]?.slug

    if (nextEpisode && autoNextEpisode) {
      handleEpisodeClick(nextEpisode, langParam)
      setIsPlaying(false)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  const toggleAutoNextEpisode = () => {
    setAutoNextEpisode((prev) => !prev)
  }

  // ------------------ Render UI -------------------------------
  const renderPlayerUI = () => {
    switch (serverIndex) {
      case 'server 1':
        return urlVideo ? (
          <iframe
            src={urlVideo}
            className='w-full h-full'
            allowFullScreen
            contextMenu='none'
            loading='lazy'
          ></iframe>
        ) : (
          <VideoNotAvailable />
        )
      case 'server 2':
        return urlVideo ? (
          <ReactHlsPlayer
            playerRef={videoRef}
            src={urlVideo}
            controls
            className='w-full h-full'
            poster={detail.thumb_url}
            onPlay={() => setIsPlaying(true)}
            onEnded={handleNextEpisode}
          />
        ) : (
          <VideoNotAvailable />
        )
      default:
        return null
    }
  }

  const isTrailer = detail.episode_current.toLowerCase().includes('trailer')
  if (isTrailer) return null

  return (
    <>
      {/* Overlay for dark mode */}
      <div
        className={cn('absolute top-0 left-0 w-full h-full z-[-1] transition duration-300', {
          'bg-black z-50': isDarkMode,
        })}
      />

      <section
        id='player'
        className={cn('flex flex-col', { 'z-50 border border-neutral-950': isDarkMode })}
      >
        {/* Player */}
        {langParam && episodeParam && (
          <div
            className={cn('relative w-full aspect-video flex flex-col flex-auto gap-3 bg-black')}
          >
            {renderPlayerUI()}
            {!isPlaying && serverIndex === 'server 2' && urlVideo && (
              <div
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                onClick={handlePlayClick}
              >
                <PlayButton />
              </div>
            )}
          </div>
        )}

        <div className='flex flex-col gap-2 p-2 bg-neutral-950'>
          {/* Server */}
          {langParam && episodeParam && (
            <div className='relative flex flex-col items-center gap-3 p-2'>
              <div
                className={cn('flex justify-between w-full gap-x-2 gap-y-5', {
                  'max-sm:flex-col-reverse max-sm:items-center': serverIndex === 'server 2',
                })}
              >
                <div className='h-full flex flex-1 max-md:hidden'></div>
                <div className='flex flex-col flex-1 md:items-center gap-2'>
                  <div
                    className={cn('flex justify-center gap-2', {
                      'max-sm:justify-start': serverIndex === 'server 1',
                    })}
                  >
                    {['server 1', 'server 2'].map((server, index) => (
                      <Button
                        key={index}
                        className={cn(
                          `text-white bg-zinc-300/5 hover:bg-blue-500/80 capitalize h-fit rounded-sm`,
                          { 'bg-blue-500/80': serverIndex === server },
                        )}
                        onClick={() => setServerIndex(server)}
                      >
                        {server}
                      </Button>
                    ))}
                  </div>
                  <p className='text-xs text-red-600'>Chọn server khác nếu không xem được</p>
                </div>
                <div className='flex items-baseline justify-end sm:flex-1 gap-4'>
                  <Button
                    className='text-xs text-white bg-transparent hover:bg-transparent h-fit gap-1 p-0'
                    onClick={toggleDarkMode}
                  >
                    {isDarkMode ? <Lightbulb size={16} /> : <LightbulbOff size={16} />}
                    {isDarkMode ? 'Bật đèn' : 'Tắt đèn'}
                  </Button>
                  <div
                    className={cn('flex items-center space-x-2 max-sm:space-x-3', {
                      hidden: serverIndex !== 'server 2',
                    })}
                  >
                    <Switch
                      id='auto-next'
                      checked={episodeParam === 'full' ? false : autoNextEpisode}
                      onCheckedChange={toggleAutoNextEpisode}
                      className={cn('!bg-yellow-500 max-sm:h-4 max-sm:w-9', {
                        '!bg-neutral-500': !autoNextEpisode || episodeParam === 'full',
                        'cursor-not-allowed': episodeParam === 'full',
                      })}
                    />
                    <Label
                      htmlFor='auto-next'
                      className={cn('text-xs cursor-pointer', {
                        'cursor-not-allowed': episodeParam === 'full',
                      })}
                    >
                      Tự chuyển tập
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Episodes */}
          <span
            className={cn('text-lg max-sm:text-base font-semibold sticky top-0 p-2', {
              hidden: episodeParam,
            })}
          >
            Chọn tập phim
          </span>
          {dataEpisode.map((item) => (
            <div
              key={item.server_name}
              className={cn('grid gap-3', {
                hidden: !item.server_name.match(/\((.*?)\)/)?.[1],
              })}
            >
              <span className='text-base max-sm:text-base font-semibold sticky top-0 p-2'>
                # {item.server_name.match(/\((.*?)\)/)?.[1]}
              </span>
              <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-2 px-2 pb-3 max-h-[300px] max-sm:h-[200px] overflow-x-hidden overflow-y-auto'>
                {item.server_data.map((episode, episodeIndex) => {
                  const isLastEpisode =
                    episodeIndex > 0 && episodeIndex === Number(detail.episode_total) - 1

                  const isLongTieng =
                    item.server_name?.toLowerCase().includes('lồng tiếng') &&
                    !item.server_name?.toLowerCase().includes('vietsub')
                  const isThuyetMinh =
                    item.server_name?.toLowerCase().includes('thuyết minh') &&
                    !item.server_name?.toLowerCase().includes('vietsub')

                  const displayText = ![
                    'full',
                    'tap-dac-biet',
                    'long-tieng',
                    'thuyet-minh',
                  ].includes(episode.slug?.toLowerCase())
                    ? episode.name.split(' ')[1]
                    : episode.name

                  const episodeOptions = isThuyetMinh
                    ? 'Thuyết minh'
                    : isLongTieng
                      ? 'Lồng tiếng'
                      : 'Vietsub'

                  const isActiveEpisode =
                    langParam &&
                    langParam.includes(`${convertToPathname(episodeOptions)}`) &&
                    episodeParam === episode.slug

                  return (
                    <Button
                      key={`${item.server_name}-${episode.slug}-${episodeIndex}`}
                      className={cn(
                        `text-sm h-fit min-w-fit hover:bg-primary-color hover:text-black rounded-sm text-center p-2 cursor-pointer text-nowrap bg-zinc-300/5`,
                        { 'bg-primary-color text-black': isActiveEpisode },
                      )}
                      onClick={() =>
                        handleEpisodeClick(
                          episode.slug,
                          item.server_data.length <= 1
                            ? (item.server_name.match(/\((.*?)\)/)?.[1] as string)
                            : detail.type === 'single'
                              ? episode.slug
                              : (item.server_name.match(/\((.*?)\)/)?.[1] as string),
                        )
                      }
                    >
                      {displayText}
                      {isLastEpisode && ' END'}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const VideoNotAvailable = () => {
  return (
    <span className='w-full h-full text-lg flex items-center justify-center'>
      Video is not available
    </span>
  )
}
