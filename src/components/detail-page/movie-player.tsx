'use client'

import { DetailResponse } from '@/models/detail'
import Hls from 'hls.js'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import PlayButton from '../common/play-button'
import { Skeleton } from '../ui/skeleton'

interface MoviePlayerProps {
  dataEpisode: DetailResponse['episodes']
  detail: DetailResponse['movie']
}

export default function MoviePlayer(props: MoviePlayerProps) {
  const { dataEpisode, detail } = props
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h3 className='text-xl font-semibold uppercase'>{detail.name}</h3>
        <p className='opacity-70 font-medium'>{detail.origin_name}</p>
      </div>
      <VideoCustom
        dataEpisode={dataEpisode}
        detail={detail}
      />
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

  useEffect(() => {
    const filteredDataEpisode = dataEpisode.map((episode) =>
      episode.server_data.find((item) => item.slug === episodeParam),
    )
    if (filteredDataEpisode) {
      setUrlVideo(filteredDataEpisode[0]?.link_m3u8 || '')
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
    <div className='max-w-[790px] grid gap-y-4'>
      <div className='relative h-full flex flex-col gap-3 bg-black bg-opacity-80'>
        {urlVideo ? (
          <>
            <video
              ref={videoRef}
              controls
              className='w-full h-[425px] object-cover'
              poster={detail.thumb_url}
            ></video>
            {!isPlaying && <PlayButton onClick={handlePlayClick} />}
          </>
        ) : (
          <Skeleton className='w-full h-[425px] bg-zinc-700' />
        )}
      </div>
      <div className='flex items-center gap-2 flex-wrap'>
        {dataEpisode.map((item) =>
          item.server_data.map((server) => (
            <div
              key={server.name}
              className={`text-sm ${server.slug === episodeParam ? 'bg-label-color' : 'bg-gray-700 bg-opacity-30'} rounded-md min-w-[65px] px-2 py-2 cursor-pointer break-keep`}
              onClick={() => handleEpisodeClick(server.link_m3u8, server.slug)}
            >
              {server.name}
            </div>
          )),
        )}
      </div>
    </div>
  )
}
