'use client'

import openRandomAdLink from '@/helpers/handle-ads'
import { cn } from '@/lib/utils'
import { DetailResponse } from '@/models/interfaces/detail'
// import { useVideoPlayer } from '@/services/query-data'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import PlayButton from '../common/play-button'
import { Button } from '../ui/button'

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

  const [urlVideo, setUrlVideo] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [serverIndex, setServerIndex] = useState('server 1')

  // const removeLeadingZero = (name: string) => {
  //   return name.replace(/tap-0(\d+)/, 'tap-$1')
  // }

  // const movieName = detail.slug.replace(/-\d{4}$/, '')
  // const { data: dataVideo = [] } = useVideoPlayer({ slug: movieName })

  // Handle render video url by server change
  useEffect(() => {
    // const sever3 = dataVideo.map((episode) => {
    //   const param =
    //     episodeParam === 'full' ? `tap-${episodeParam}` : removeLeadingZero(`${episodeParam}`)
    //   return episode.items.find((item) => item.slug === param)
    // })

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
      // case 'server 3':
      //   video = sever3[0]?.embed as string
      //   break
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

  const handleEpisodeClick = (episode: string) => {
    openRandomAdLink()
    router.push(`?episode=${episode}`)
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
      // case 'server 3':
      //   return urlVideo ? (
      //     <iframe
      //       src={urlVideo}
      //       className='w-full h-full'
      //       allowFullScreen
      //       loading='lazy'
      //     ></iframe>
      //   ) : (
      //     <VideoNotAvailable />
      //   )
      default:
        return null
    }
  }

  const isTrailer = detail.episode_current.toLowerCase().includes('trailer')
  if (isTrailer) return null

  return (
    <section
      id='video'
      className='flex flex-col'
    >
      <div className='relative w-full max-sm:h-[250px] sm:h-[550px] flex flex-col flex-auto gap-3 bg-black'>
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
      <div className='max-h-[300px] flex flex-col gap-2 p-2 bg-black/50'>
        <div className='flex items-center gap-2 p-2'>
          {['server 1', 'server 2'].map((server, index) => (
            <Button
              key={index}
              className={cn(
                `text-white bg-zinc-300/5 hover:bg-label-color h-10 min-w-[30px] uppercase font-bold`,
                `${serverIndex === server && 'bg-label-color'}`,
              )}
              onClick={() => setServerIndex(server)}
            >
              {server}
            </Button>
          ))}
        </div>
        <span className='text-lg font-bold uppercase sticky top-0 p-2'>Danh sách tập</span>
        <div className='grid grid-cols-12 max-xl:grid-cols-9 max-sm:grid-cols-6 gap-2 px-2 pb-3 overflow-auto'>
          {dataEpisode.map((item) =>
            item.server_data.map((episode, serverIndex) => {
              const isLastEpisode =
                serverIndex > 0 && serverIndex === Number(detail.episode_total) - 1
              return (
                <Button
                  key={episode.name}
                  className={cn(
                    `text-sm min-w-fit h-9 hover:bg-label-color rounded-md text-center px-2 py-1 cursor-pointer text-nowrap bg-zinc-300/5`,
                    `${(episodeParam ? episode.slug === episodeParam : serverIndex === 0) && 'bg-label-color'}`,
                  )}
                  onClick={() => handleEpisodeClick(episode.slug)}
                >
                  {!['full', 'tập đặc biệt', 'lồng tiếng'].includes(episode.name?.toLowerCase())
                    ? episode.name.split(' ')[1]
                    : episode.name}
                  {isLastEpisode && ' END'}
                </Button>
              )
            }),
          )}
        </div>
      </div>
    </section>
  )
}

const VideoNotAvailable = () => {
  return (
    <div className='w-full h-full text-lg flex items-center justify-center'>
      Không có video vui lòng chọn server khác
    </div>
  )
}
