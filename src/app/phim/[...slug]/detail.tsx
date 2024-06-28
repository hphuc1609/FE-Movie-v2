/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/components/api-client/movie'
import isSuccessResponse from '@/helpers/check-response'
import { DetailResponse } from '@/models/detail'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import Reviewbox from '../common/review-box'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import MovieDetailCard from '@/components/detail-page/movie-info'
import MoviePlayer from '@/components/detail-page/movie-player'
import { useLoading } from '@/components/loading-provider'
import { removeCookie } from 'typescript-cookie'

export default function Detail() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loader = useLoading()
  const [detail, setDetail] = useState({} as DetailResponse['movie'])
  const [dataEpisode, setDataEpisode] = useState<DetailResponse['episodes']>([])
  const [isWatch, setIsWatch] = useState(false)

  const nameMovieFromUrl = pathname.split('/').pop() as string
  const episodeParam = searchParams.get('episode') as string

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
    <div className='px-20 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <BreadcrumbCustom breadCrumb={detail.name} />
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
