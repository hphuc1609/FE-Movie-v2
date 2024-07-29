'use client'

import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import useFetchData from '@/hooks/use-fetch'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Skeleton } from '../ui/skeleton'
import { useLoading } from '../loading-provider'
import { NewMovieItem } from '@/models/new-movie'

export default function NewUpdateMovie() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const loader = useLoading()

  // ------------------ Fetch Data ----------------------------
  const fetchNewMovies = async (): Promise<NewMovieItem[] | null> => {
    try {
      const res = await movieApi.getNewMovies({})
      if (!isSuccessResponse(res)) return null

      return res.items
    } catch (error) {
      console.error('Failed to fetch new movies:', error)
      return null
    } finally {
      loader.hidden()
    }
  }

  const { isLoading, data } = useFetchData({ queryKey: ['listNewMovie'], queryFn: fetchNewMovies })

  // ----------------- Render UI -------------------------
  return (
    <div className='flex flex-col gap-3 w-[360px] max-sm:w-full max-xl:w-[289px] max-lg:hidden'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl uppercase font-semibold line-clamp-1 text-primary-color'>
          Phim đề cử
        </h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <Link
            href={`/danh-sach/phim-moi?page=1`}
            className='text-sm text-white text-opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
          >
            Xem thêm
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
      {/* List */}
      <div
        className={`${isMobile && 'max-h-[450px]'} rounded-sm bg-black bg-opacity-30 overflow-auto p-3 flex flex-col gap-3`}
      >
        {isLoading ? (
          <SkeletonList />
        ) : (
          data?.slice(0, 10).map((item) => (
            <div
              key={item._id}
              className='h-[90px] max-md:min-h-[90px] overflow-hidden'
            >
              <Link
                href={`/phim/${item.slug}`}
                className='w-full h-full flex gap-3 bg-black bg-opacity-0 hover:bg-opacity-50'
                onClick={() => loader.show()}
              >
                <div className='w-[80px] h-full bg-gray-50 bg-opacity-10'>
                  <Image
                    src={`${item.poster_url}`}
                    alt={item.name}
                    width={478}
                    height={190}
                    priority
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='relative flex flex-col gap-1 flex-1 py-2'>
                  <span className='text-[13px] line-clamp-1 font-semibold'>{item.name}</span>
                  <span className='text-xs opacity-50 line-clamp-2'>{item.origin_name}</span>
                  <span className='text-xs opacity-50'>{item.year}</span>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const SkeletonList = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='h-[90px] max-md:min-h-[90px] flex gap-4 overflow-hidden'
        >
          <Skeleton className='min-w-[80px] h-full bg-skeleton rounded-none' />
          <div className='relative w-full flex flex-col gap-1 py-2'>
            <Skeleton className='w-full h-[10px] bg-skeleton' />
            <Skeleton className='w-[200px] h-[10px] bg-skeleton' />
            <Skeleton className='w-[80px] h-[10px] bg-skeleton' />
          </div>
        </div>
      ))}
    </>
  )
}
