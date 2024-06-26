/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import isSuccessResponse from '@/helpers/check-response'
import { DetailResponse } from '@/models/detail'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import BreadcrumbCustom from '../common/breadcrumb-custom'
// import Reviewbox from '../common/review-box'
import { removeCookie } from 'typescript-cookie'
import { useLoading } from '../loading-provider'
import MovieDetailCard from './movie-card'
import MoviePlayer from './movie-player'

export default function Detail() {
  const { path } = useParams()
  const searchParams = useSearchParams()
  const loader = useLoading()
  const [detail, setDetail] = useState({} as DetailResponse['movie'])
  const [dataEpisode, setDataEpisode] = useState<DetailResponse['episodes']>([])
  const [isWatch, setIsWatch] = useState(false)

  const nameMovieFromUrl = path[0] || ''
  const episodeParam = searchParams.get('episode') || ''

  const getDetail = async (movieName: string) => {
    loader.show()
    try {
      const res = await movieApi.getDetail({ name: movieName })
      if (isSuccessResponse(res)) {
        setDetail(res.movie)
        setDataEpisode(res.episodes)
      } else {
        console.error('Lỗi tải thông tin phim: ', res.msg)
      }
    } catch (error) {
      console.error('Lỗi tải thông tin phim: ', error)
    } finally {
      loader.hidden()
    }
  }

  // Check param episode
  useEffect(() => {
    if (!episodeParam) {
      sessionStorage.removeItem('isWatch')
      removeCookie('urlVideo')
      setIsWatch(false)
    }
  }, [episodeParam])

  useEffect(() => {
    if (!nameMovieFromUrl) {
      return
    }
    getDetail(nameMovieFromUrl)
  }, [nameMovieFromUrl])

  useEffect(() => {
    const getWatchLocal = sessionStorage.getItem('isWatch') === 'true'
    if (!getWatchLocal) {
      return
    }
    setIsWatch(getWatchLocal)
  }, [isWatch])

  return detail && dataEpisode.length > 0 ? (
    <div className='px-20 py-[35px] flex flex-col gap-9'>
      <BreadcrumbCustom movieName={detail.name} />
      {!isWatch ? (
        <MovieDetailCard
          detail={detail}
          dataEpisode={dataEpisode}
          isWatch={isWatch}
          setIsWatch={setIsWatch}
        />
      ) : (
        <MoviePlayer
          detail={detail}
          dataEpisode={dataEpisode}
        />
      )}
      {/* <Reviewbox /> */}
    </div>
  ) : null
}
