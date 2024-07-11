/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import Reviewbox from '@/components/common/review-box'
import MovieDetailCard from '@/components/detail-page/movie-info'
import MoviePlayer from '@/components/detail-page/movie-player'
import NewUpdateMovie from '@/components/home-page/new-movie'
import { DetailResponse } from '@/models/detail'
import { NewMovieItem } from '@/models/new-movie'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

interface DetailProps {
  dataNewMovie: NewMovieItem[]
  dataByCategory: DetailResponse
}

export default function Detail(props: DetailProps) {
  const { dataNewMovie, dataByCategory } = props
  const searchParams = useSearchParams()
  const [isWatch, setIsWatch] = useState(false)

  const episodeParam = searchParams.get('episode') as string
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  // Check param episode
  useEffect(() => {
    if (!episodeParam) {
      sessionStorage.removeItem('isWatch')
      setIsWatch(false)
    }
  }, [episodeParam])

  // Handle check watch button click
  useEffect(() => {
    const getWatchLocal = sessionStorage.getItem('isWatch') === 'true'
    setIsWatch(getWatchLocal)
  }, [isWatch])

  return (
    <>
      <BreadcrumbCustom breadCrumb={dataByCategory?.movie.name} />
      {!isWatch ? (
        <MovieDetailCard
          detail={dataByCategory?.movie}
          dataEpisode={dataByCategory?.episodes}
          isWatch={isWatch}
          setIsWatch={setIsWatch}
        />
      ) : (
        <MoviePlayer
          dataNewMovie={dataNewMovie}
          detail={dataByCategory?.movie}
          dataEpisode={dataByCategory?.episodes}
        />
      )}
      <div className='flex max-md:flex-col gap-[30px]'>
        {!isWatch && <Reviewbox />}
        {isWatch && isMobile && <NewUpdateMovie data={dataNewMovie} />}
      </div>
    </>
  )
}
