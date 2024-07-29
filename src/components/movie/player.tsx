/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movies'
import useFetchData from '@/hooks/use-fetch'
import { DetailResponse, Episode } from '@/models/detail'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import PlayButton from '../common/play-button'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import Loader from '../loader'
import { useLoading } from '../loading-provider'

interface MoviePlayerProps {
  dataEpisode: DetailResponse['episodes']
  detail: DetailResponse['movie']
}

const AD_URL = process.env.NEXT_PUBLIC_AD_URL
const AD_INTERVAL = 3600000 // 1 hour in milliseconds

export default function MoviePlayer(props: MoviePlayerProps) {
  const { dataEpisode, detail } = props
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const loader = useLoading()
  const episodeParam = searchParams.get('episode') || ''

  const [urlVideo, setUrlVideo] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [serverIndex, setServerIndex] = useState('server 1')

  const removeLeadingZero = (name: string) => {
    return name.replace(/tap-0(\d+)/, 'tap-$1')
  }

  // Handle fetch data
  const fetchVideo = async (): Promise<DetailResponse['episodes']> => {
    try {
      const slugName = detail.slug.replace(/-\d{4}$/, '')
      const response = await movieApi.getMovieInfo({ slug: slugName })

      const { movie } = response || {}
      return movie.episodes
    } catch (error: any) {
      console.error('Error fetching video data:', error.message)
      return []
    }
  }

  const queryVideo = useFetchData({ queryKey: ['video'], queryFn: fetchVideo })

  // ------------------ Effect Hooks ----------------------------
  // Handle render video url by server change
  useEffect(() => {
    const filteredData = dataEpisode.map((episode) =>
      episode.server_data.find((item) => item.slug === episodeParam),
    )

    const episodeServer2 = (queryVideo.data as Episode[])?.map((episode) => {
      const param =
        episodeParam === 'full' ? `tap-${episodeParam}` : removeLeadingZero(`${episodeParam}`)
      return episode.items.find((item) => item.slug === param)
    })

    let video: string | undefined
    switch (serverIndex) {
      case 'server 1':
        video = filteredData[0]?.link_embed || dataEpisode[0]?.server_data[0]?.link_embed
        break
      case 'server 2':
        video = episodeServer2[0]?.embed
        break
      case 'server 3':
        video = filteredData[0]?.link_m3u8 || dataEpisode[0]?.server_data[0]?.link_m3u8
        break
      default:
        break
    }
    setUrlVideo(video as string)
    loader.hidden()
  }, [dataEpisode, serverIndex, episodeParam])

  // ------------------ Event Handlers ----------------------------
  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
  }

  const handleEpisodeClick = (episode: string) => {
    loader.show()

    const lastAdShown = localStorage.getItem('lastAdShown')
    const now = Date.now()

    // Check if the last ad was shown less than an hour ago
    if (!lastAdShown || now - Number(lastAdShown) > AD_INTERVAL) {
      localStorage.setItem('lastAdShown', now.toString())
      window.open(AD_URL, '_blank', 'noopener,noreferrer')
    }
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
          ></iframe>
        ) : (
          <VideoNotAvailable />
        )
      case 'server 2':
        return urlVideo ? (
          <iframe
            src={urlVideo}
            className='w-full h-full'
            allowFullScreen
          ></iframe>
        ) : (
          <VideoNotAvailable />
        )
      case 'server 3':
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
        return <Skeleton className='h-full bg-zinc-500 bg-opacity-50 rounded-none' />
    }
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='relative h-[350px] lg:h-[550px] flex flex-col flex-auto gap-3 bg-black bg-opacity-80'>
        {renderPlayerUI()}
        {!isPlaying && serverIndex === 'server 3' && (
          <div
            className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-5'
            onClick={handlePlayClick}
          >
            <PlayButton />
          </div>
        )}
      </div>
      <div className='max-h-[300px] flex flex-col gap-2 p-2 bg-black bg-opacity-40'>
        <div className='flex items-center gap-2 p-2'>
          {['server 1', 'server 2', 'server 3'].map((server, index) => (
            <Button
              key={index}
              className={`text-white capitalize ${serverIndex === server ? 'bg-label-color' : 'bg-zinc-300 bg-opacity-5'} hover:bg-label-color h-[35px] min-w-[30px]`}
              onClick={() => setServerIndex(server)}
            >
              {server}
            </Button>
          ))}
        </div>
        <span className='text-lg sticky top-0 p-2'>Danh sách tập</span>
        <div className='grid grid-cols-12 max-xl:grid-cols-9 max-sm:grid-cols-6 gap-2 px-2 pb-3 overflow-auto'>
          {dataEpisode.map((item) =>
            item.server_data.map((server, serverIndex) => {
              const isLastEpisode =
                serverIndex > 0 && serverIndex === Number(detail.episode_total) - 1
              return (
                <div
                  key={server.name}
                  className={`text-sm ${(episodeParam ? server.slug === episodeParam : serverIndex === 0) ? 'bg-label-color' : 'bg-zinc-300 bg-opacity-5'} hover:bg-label-color rounded-md text-center px-2 py-1 cursor-pointer text-nowrap`}
                  onClick={() => handleEpisodeClick(server.slug)}
                >
                  {!['full', 'tập đặc biệt'].includes(server.name?.toLowerCase())
                    ? server.name.split(' ')[1]
                    : server.name}
                  {isLastEpisode && ' END'}
                </div>
              )
            }),
          )}
        </div>
      </div>
    </div>
  )
}

const VideoNotAvailable = () => {
  return (
    <div className='w-full h-full text-lg flex items-center justify-center'>
      Không có video vui lòng chọn server khác
    </div>
  )
}
