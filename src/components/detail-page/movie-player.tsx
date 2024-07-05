'use client'

import { DetailResponse } from '@/models/detail'
import { NewMovieItem } from '@/models/new-movie'
import Hls from 'hls.js'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import PlayButton from '../common/play-button'
import Reviewbox from '../common/review-box'
import NewUpdateMovie from '../home-page/new-movie'
import { Skeleton } from '../ui/skeleton'

interface MoviePlayerProps {
  dataEpisode: DetailResponse['episodes']
  detail: DetailResponse['movie']
  dataNewMovie: NewMovieItem[]
}

export default function MoviePlayer(props: MoviePlayerProps) {
  const { dataEpisode, detail, dataNewMovie } = props
  const mobile = useMediaQuery({ query: '(max-width: 640px)' })

  return (
    <div className='flex gap-[30px]'>
      <div className='w-[839px] flex flex-col gap-3'>
        <div>
          <h1 className='text-xl font-semibold uppercase text-primary-color line-clamp-1'>
            {detail.name}
          </h1>
          <p className='opacity-70 text-base font-medium line-clamp-1'>{detail.origin_name}</p>
        </div>
        <div className='flex flex-col gap-5'>
          <VideoCustom
            dataEpisode={dataEpisode}
            detail={detail}
          />
          <Reviewbox />
        </div>
      </div>
      {!mobile && <NewUpdateMovie data={dataNewMovie} />}
    </div>
  )
}

interface VideoCustomProps {
  dataEpisode: DetailResponse['episodes']
  detail: DetailResponse['movie']
}
const VideoCustom = ({ dataEpisode, detail }: VideoCustomProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialVideo = dataEpisode[0]?.server_data[0]?.link_m3u8
  const episodeParam = searchParams.get('episode')

  const [urlVideo, setUrlVideo] = useState(initialVideo || '')
  const [isPlaying, setIsPlaying] = useState(false)

  // Check param episode and set url
  useEffect(() => {
    const filteredDataEpisode = dataEpisode.map((episode) =>
      episode.server_data.find((item) => item.slug === episodeParam),
    )
    if (filteredDataEpisode) {
      setUrlVideo(filteredDataEpisode[0]?.link_m3u8 as string)
    }
  }, [dataEpisode, episodeParam])

  useEffect(() => {
    const videoSrc = urlVideo
    if (Hls.isSupported()) {
      if (!videoRef.current) {
        console.error('Video element not found')
        return
      }
      if (!videoSrc) {
        console.error('Video source not found')
        return
      }

      const hls = new Hls()
      hls.loadSource(videoSrc)
      hls.attachMedia(videoRef.current)
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoSrc
    }
    setIsPlaying(false)
  }, [urlVideo])

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
  }

  const handleEpisodeClick = (url: string, episode: string) => {
    setUrlVideo(url)
    router.push(`/phim/${detail.slug}?episode=${episode}`)
  }

  return (
    <div className='h-fit flex flex-col gap-y-4'>
      <div className='relative flex flex-col gap-3 bg-black bg-opacity-80'>
        {urlVideo ? (
          <>
            <video
              ref={videoRef}
              controls
              className='w-full h-[325px] lg:h-[500px]'
              poster={detail.thumb_url}
            ></video>
            {!isPlaying && (
              <div
                className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-5'
                onClick={handlePlayClick}
              >
                <PlayButton />
              </div>
            )}
          </>
        ) : (
          <Skeleton className='flex-auto h-[425px] bg-zinc-800' />
        )}
      </div>
      {detail.episode_current?.toLowerCase() !== 'full' && (
        <div className='max-h-[300px] flex flex-col gap-2 p-3 overflow-y-auto bg-black bg-opacity-20 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent'>
          <span className='text-base'>Chọn tập phim</span>
          <div className='grid grid-cols-11 max-xl:grid-cols-9 max-lg:grid-cols-6 max-sm:grid-cols-5 gap-2'>
            {dataEpisode.map((item) =>
              item.server_data.map((server, serverIndex) => {
                const isLastEpisode =
                  serverIndex > 0 && serverIndex === Number(detail.episode_total) - 1
                return (
                  <div
                    key={server.name}
                    className={`text-sm ${server.slug === episodeParam ? 'bg-primary-color' : 'bg-zinc-100 bg-opacity-5'} hover:bg-zinc-100 hover:bg-opacity-30 rounded-md min-w-[60px] text-center px-1 py-1 cursor-pointer text-nowrap`}
                    onClick={() => handleEpisodeClick(server.link_m3u8, server.slug)}
                  >
                    {server.name.split(' ')[1]}
                    {isLastEpisode && ' END'}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
