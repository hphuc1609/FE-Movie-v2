/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movies'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import ErrorMessage from '@/components/common/error-message'
import Reviewbox from '@/components/common/review-box'
import MovieInfo from '@/components/movie/detail'
import NewUpdateMovie from '@/components/movie/new'
import MoviePlayer from '@/components/movie/player'
import { Skeleton } from '@/components/ui/skeleton'
import useFetchData from '@/custom-hooks/useFetchData'
import isSuccessResponse from '@/helpers/check-response'
import { DetailResponse } from '@/models/detail'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

interface DetailProps {}

export default function Detail(props: DetailProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isWatch, setIsWatch] = useState(false)

  const slug = pathname.split('/').pop() as string
  const episodeParam = searchParams.get('episode') as string
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  const fetchMovieInfo = async () => {
    try {
      const res = await movieApi.getDetail({ name: slug })
      if (!isSuccessResponse(res)) {
        console.error(res.msg)
        return null
      }
      return res
    } catch (error: any) {
      console.error('Error fetching movie info:', error.message)
      return null
    }
  }

  const { isLoading, data, isError } = useFetchData({
    queryKey: ['movie-detail', slug],
    queryFn: fetchMovieInfo,
  })

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

  if (isLoading) return <SkeletonDetail />
  if (!data || typeof data !== 'object' || isError) return <ErrorMessage />

  return (
    <div className='max-w-screen-xl m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <BreadcrumbCustom breadCrumb={data.movie?.name} />
      {!isWatch ? (
        <MovieInfo
          detail={data.movie}
          dataEpisode={data.episodes}
          isWatch={isWatch}
          setIsWatch={setIsWatch}
        />
      ) : (
        <MoviePlayer
          detail={data.movie}
          dataEpisode={data.episodes}
        />
      )}
      <div className='flex max-md:flex-col gap-[30px]'>
        {!isWatch && <Reviewbox />}
        {isWatch && isMobile && <NewUpdateMovie />}
      </div>
    </div>
  )
}

const SkeletonDetail = () => {
  return (
    <div className='max-w-screen-xl m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <BreadcrumbCustom breadCrumb='...' />
      <div className='flex max-md:flex-col gap-[30px]'>
        <Skeleton className='w-[300px] h-[440px] max-md:m-auto rounded-md bg-skeleton' />
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-[450px] h-[30px] bg-skeleton' />
            <Skeleton className='w-[300px] h-[20px] bg-skeleton' />
          </div>
          <Skeleton className='w-full h-[200px] bg-skeleton' />
          <div className='flex flex-col gap-2'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className='w-[500px] h-[15px] bg-skeleton'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
