'use client'

import openRandomAdLink from '@/helpers/handle-ads'
import { cn } from '@/lib/utils'
import { DetailResponse } from '@/models/interfaces/detail'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import PlayButton from '../common/play-button'
import { Button } from '../ui/button'
import { convertToPathname } from '@/helpers/cleanString'

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

  // Handle render video url by server change
  useEffect(() => {
    const filteredServer = dataEpisode.map((episode) =>
      episode.server_data.find((item) => item.slug === episodeParam),
    )

    let video = ''
    switch (serverIndex) {
      case 'server 1':
        video = filteredServer[0]?.link_embed || dataEpisode[0]?.server_data[0]?.link_embed
        break
      case 'server 2':
        video = filteredServer[0]?.link_m3u8 || dataEpisode[0]?.server_data[0]?.link_m3u8
        break
      default:
        break
    }

    setUrlVideo(video)
  }, [dataEpisode, serverIndex, episodeParam])

  // ------------------ Handlers ----------------------------
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
    <section
      id='player'
      className='flex flex-col'
    >
      <div className='relative w-full aspect-video flex flex-col flex-auto gap-3 bg-black'>
        {renderPlayerUI()}
        {!isPlaying && serverIndex === 'server 2' && (
          <div
            className='absolute top-0 left-0 w-full h-full'
            onClick={handlePlayClick}
          >
            <PlayButton />
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 p-2 bg-black/50'>
        <div className='flex flex-col items-center gap-2 p-2'>
          <div className='flex gap-2'>
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
          <p className='text-xs text-red-500'>Chọn server khác nếu không xem được</p>
        </div>
        {dataEpisode.map((item) => (
          <div
            key={item.server_name}
            className='grid gap-3'
          >
            <span className='text-base max-sm:text-base font-semibold sticky top-0 p-2'>
              # {item.server_name.match(/\((.*?)\)/)?.[1]}
            </span>

            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-2 px-2 pb-3 max-h-[300px] overflow-x-hidden overflow-y-auto'>
              {item.server_data.map((episode, episodeIndex) => {
                const isLastEpisode =
                  episodeIndex > 0 && episodeIndex === Number(detail.episode_total) - 1

                const isLongTieng =
                  item.server_name?.toLowerCase().includes('lồng tiếng') &&
                  !item.server_name?.toLowerCase().includes('vietsub')
                const isThuyetMinh =
                  item.server_name?.toLowerCase().includes('thuyết minh') &&
                  !item.server_name?.toLowerCase().includes('vietsub')

                const displayText = !['full', 'tap-dac-biet', 'long-tieng', 'thuyet-minh'].includes(
                  episode.slug?.toLowerCase(),
                )
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
  )
}

const VideoNotAvailable = () => {
  return (
    <span className='w-full h-full text-lg flex items-center justify-center'>
      Video is not available
    </span>
  )
}
