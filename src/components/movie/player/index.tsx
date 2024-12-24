'use client'

import PlayButton from '@/components/common/play-button'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { convertToPathname } from '@/helpers/cleanString'
import openRandomAdLink from '@/helpers/handle-ads'
import scrollToSection from '@/helpers/scroll-to-section'
import { cn } from '@/lib/utils'
import { MovieDetail } from '@/models/interfaces/detail'
import { Lightbulb, LightbulbOff } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import PlayerEpisode from './player-episode'

interface MoviePlayerProps {
  dataEpisode: MovieDetail['episodes']
  detail: MovieDetail
}

const MoviePlayer = (props: MoviePlayerProps) => {
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

  const normalizeEpisodeSlug = (slug: string) => slug?.replace(/^tap-0*/, 'tap-')

  // Handle render video url by server
  useEffect(() => {
    const episodeData = dataEpisode.flatMap((episode) => {
      const matchedData = episode.server_data.find(
        (item) => normalizeEpisodeSlug(item.slug) === normalizeEpisodeSlug(episodeParam),
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
    switch (serverIndex) {
      case 'server 1':
        video =
          linkVideo?.link_embed ||
          episodeData[0]?.data?.link_embed ||
          dataEpisode[0].server_data[0].link_embed
        break
      case 'server 2':
        video =
          linkVideo?.link_m3u8 ||
          episodeData[0]?.data?.link_m3u8 ||
          dataEpisode[0].server_data[0].link_m3u8
        break
      default:
        break
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
        (item) => normalizeEpisodeSlug(item.slug) === normalizeEpisodeSlug(episodeParam),
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
          'bg-black/95 z-50': isDarkMode,
        })}
      />

      <section
        id='player'
        className={cn('flex flex-col', {
          'z-50 border border-neutral-950': isDarkMode,
        })}
      >
        {/* Video */}
        {langParam && episodeParam && (
          <div className='relative w-full aspect-video flex flex-col flex-auto gap-3 bg-black'>
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

        <div className='flex flex-col gap-5 px-[25px] max-sm:p-4 py-5 bg-neutral-950'>
          {/* Servers */}
          {langParam && episodeParam && (
            <div className='relative flex flex-col items-center gap-3'>
              <div className='flex justify-between w-full gap-x-2 gap-y-5 max-sm:flex-col-reverse max-sm:items-center'>
                <div className='h-full flex flex-1 max-md:hidden'></div>
                <div className='flex flex-col flex-1 items-center gap-2'>
                  <div className='flex justify-center gap-2'>
                    {['server 1', 'server 2'].map((server, index) => (
                      <Button
                        key={index}
                        className={cn(
                          `text-sm text-white bg-zinc-300/5 hover:bg-blue-500/80 capitalize h-fit rounded-sm`,
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
                <div className='flex items-baseline justify-end md:flex-1 gap-4'>
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
                      id='toggle-next-episode'
                      checked={episodeParam === 'full' ? false : autoNextEpisode}
                      onCheckedChange={toggleAutoNextEpisode}
                      className={cn('!bg-yellow-500 max-sm:h-4 max-sm:w-9', {
                        '!bg-neutral-500': !autoNextEpisode || episodeParam === 'full',
                        'cursor-not-allowed': episodeParam === 'full',
                      })}
                    />
                    <Label
                      htmlFor='toggle-next-episode'
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

          {/* Episode */}
          <PlayerEpisode
            dataEpisode={dataEpisode}
            detail={detail}
            normalizeEpisodeSlug={normalizeEpisodeSlug}
            handleEpisodeClick={handleEpisodeClick}
          />
        </div>
      </section>
    </>
  )
}

export default MoviePlayer

const VideoNotAvailable = () => {
  return (
    <span className='w-full h-full text-lg flex items-center justify-center'>
      Video is not available
    </span>
  )
}
