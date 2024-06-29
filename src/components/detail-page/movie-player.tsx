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
      <div className='flex flex-1 flex-col gap-3'>
        <div>
          <h3 className='text-xl font-semibold uppercase text-primary-color'>{detail.name}</h3>
          <p className='opacity-70 text-base font-medium'>{detail.origin_name}</p>
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
    <div className='lg:w-[839px] max-lg:flex-auto h-fit flex flex-col gap-y-4'>
      <div className='relative flex flex-col gap-3 bg-black bg-opacity-80'>
        {urlVideo ? (
          <>
            <video
              ref={videoRef}
              controls
              className='w-full h-[325px] md:h-[500px] object-cover'
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
          <Skeleton className='flex-auto h-[425px] bg-zinc-700' />
        )}
      </div>
      <div className='flex items-center gap-2 flex-wrap'>
        {dataEpisode.map((item, index) =>
          item.server_data.map((server, serverIndex) => (
            <div
              key={server.name}
              className={`text-sm ${server.slug === episodeParam ? 'bg-zinc-100 bg-opacity-30' : 'bg-zinc-600 bg-opacity-20'} hover:bg-zinc-100 hover:bg-opacity-30 rounded-md min-w-[65px] max-w-[200px] text-center px-2 py-2 cursor-pointer text-nowrap`}
              onClick={() => handleEpisodeClick(server.link_m3u8, server.slug)}
            >
              {server.name}
              {index === dataEpisode.length - 1 &&
                serverIndex > 1 &&
                serverIndex === item.server_data.length - 1 &&
                ' END'}
            </div>
          )),
        )}
      </div>
    </div>
  )
}
