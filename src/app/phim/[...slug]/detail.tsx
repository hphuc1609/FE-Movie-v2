/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import Reviewbox from '@/components/common/review-box'
import MovieDetailCard from '@/components/detail-page/movie-info'
import MoviePlayer from '@/components/detail-page/movie-player'
import NewUpdateMovie from '@/components/home-page/new-movie'
import { useLoading } from '@/components/loading-provider'
import isSuccessResponse from '@/helpers/check-response'
import { DetailResponse } from '@/models/detail'
import { NewMovieItem } from '@/models/new-movie'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { removeCookie } from 'typescript-cookie'

interface DetailProps {
  dataNewMovie: NewMovieItem[]
}

export default function Detail(props: DetailProps) {
  const { dataNewMovie } = props
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loader = useLoading()
  const [detail, setDetail] = useState({} as DetailResponse['movie'])
  const [dataEpisode, setDataEpisode] = useState<DetailResponse['episodes']>([])
  const [isWatch, setIsWatch] = useState(false)

  const nameMovieFromUrl = pathname.split('/').pop() as string
  const episodeParam = searchParams.get('episode') as string
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

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

  // Get detail movie
  useEffect(() => {
    if (!nameMovieFromUrl) {
      return
    }
    getDetail(nameMovieFromUrl)
  }, [nameMovieFromUrl])

  // Handle check watch button click
  useEffect(() => {
    const getWatchLocal = sessionStorage.getItem('isWatch') === 'true'
    if (!getWatchLocal) {
      return
    }
    setIsWatch(getWatchLocal)
  }, [isWatch])

  return detail && dataEpisode.length > 0 ? (
    <>
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
          dataNewMovie={dataNewMovie}
          detail={detail}
          dataEpisode={dataEpisode}
        />
      )}
      <div className='flex max-md:flex-col gap-[30px]'>
        {!isWatch && <Reviewbox />}
        {isWatch && isMobile && <NewUpdateMovie data={dataNewMovie} />}
      </div>
    </>
  ) : null
}
