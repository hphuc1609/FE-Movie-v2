/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import { DetailResponse } from '@/models/detail'
import { NewMovieItem } from '@/models/new-movie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import { useMediaQuery } from 'react-responsive'
import PlayButton from '../common/play-button'
import Reviewbox from '../common/review-box'
import NewUpdateMovie from '../home-page/new-movie'
import { Button } from '../ui/button'
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
      <div className='w-[839px] flex flex-col'>
        <h1 className='text-xl font-semibold uppercase text-primary-color line-clamp-1'>
          {detail.name}
        </h1>
        <h3 className='opacity-70 text-base font-medium line-clamp-1'>{detail.origin_name}</h3>
        <div className='flex flex-col gap-5 mt-3'>
          <VideoPlayer
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

interface VideoPlayerProps {
  dataEpisode: DetailResponse['episodes']
  detail: DetailResponse['movie']
}
const VideoPlayer = ({ dataEpisode, detail }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const episodeParam = searchParams.get('episode')

  const [urlVideo, setUrlVideo] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [dataVideo, setDataVideo] = useState('')
  const [serverIndex, setServerIndex] = useState(0)

  const fetchDataVideo = useCallback(async () => {
    try {
      const slugName = detail.slug.replace(/-\d{4}$/, '')
      const response = await movieApi.getMovieInfo({ slug: slugName })
      if (!isSuccessResponse(response)) return

      const { movie } = response
      const urlVideo = movie.episodes[0].items[0].embed
      setDataVideo(urlVideo)
    } catch (error: any) {
      console.error('Error fetching video data:', error.message)
    }
  }, [detail.slug])

  // Check param episode and set url
  useEffect(() => {
    const filteredDataEpisode = dataEpisode.map((episode) =>
      episode.server_data.find((item) => item.slug === episodeParam),
    )
    const video = !serverIndex
      ? filteredDataEpisode[0]?.link_embed
      : filteredDataEpisode[0]?.link_m3u8
    setUrlVideo(video as string)

    // Fetch video data
    fetchDataVideo()
  }, [dataEpisode, serverIndex, episodeParam])

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

  const renderPlayerUI = () => {
    const frameElement = (
      <div className='w-full h-full text-lg flex items-center justify-center'>
        Không có video vui lòng chọn server khác
      </div>
    )

    switch (serverIndex) {
      case 0:
        return urlVideo ? (
          <iframe
            src={urlVideo}
            className='w-full h-full'
            allowFullScreen
          ></iframe>
        ) : (
          frameElement
        )
      case 1:
        return dataVideo ? (
          <iframe
            src={dataVideo}
            className='w-full h-full'
            allowFullScreen
          ></iframe>
        ) : (
          frameElement
        )
      case 2:
        return urlVideo ? (
          <ReactHlsPlayer
            playerRef={videoRef}
            src={urlVideo}
            controls
            className='w-full h-full'
            poster={detail.thumb_url}
          />
        ) : (
          frameElement
        )
      default:
        return null
    }
  }

  return (
    <div className='h-fit flex flex-col gap-y-4'>
      <div className='relative h-[325px] lg:h-[500px] flex flex-col gap-3 bg-black bg-opacity-80'>
        {urlVideo ? (
          renderPlayerUI()
        ) : (
          <Skeleton className='h-full bg-zinc-500 bg-opacity-50 rounded-none' />
        )}
        {!isPlaying && serverIndex === 2 && (
          <div
            className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-5'
            onClick={handlePlayClick}
          >
            <PlayButton />
          </div>
        )}
      </div>
      <div className='max-h-[300px] flex flex-col gap-2 bg-black bg-opacity-20'>
        <div className='flex items-center gap-2 text-base p-2'>
          Server:
          {['#1', '#2', '#3'].map((_, index) => (
            <Button
              key={index}
              className={`text-white ${serverIndex === index && 'bg-primary-color'} hover:bg-primary-color h-[30px] w-[30px]`}
              onClick={() => setServerIndex(index)}
            >
              #{index + 1}
            </Button>
          ))}
        </div>
        <span className='text-lg sticky top-0 p-2'>Danh sách tập</span>
        <div className='grid grid-cols-11 max-xl:grid-cols-9 max-lg:grid-cols-6 px-2 pb-3 max-sm:grid-cols-5 gap-2 overflow-auto'>
          {dataEpisode.map((item) =>
            item.server_data.map((server, serverIndex) => {
              const isLastEpisode =
                serverIndex > 0 && serverIndex === Number(detail.episode_total) - 1
              return (
                <div
                  key={server.name}
                  className={`text-sm ${server.slug === episodeParam ? 'bg-zinc-100 bg-opacity-30' : 'bg-zinc-100 bg-opacity-5'} hover:bg-zinc-100 hover:bg-opacity-30 rounded-md min-w-fit h-fit text-center px-2 py-1 cursor-pointer text-nowrap`}
                  onClick={() => handleEpisodeClick(server.link_m3u8, server.slug)}
                >
                  {!['full', 'tập đặc biệt'].includes(server.name.toLowerCase())
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
