'use client'

import movieApi from '@/api-client/movies'
import useFetchData from '@/custom-hooks/useFetchData'
import isSuccessResponse from '@/helpers/check-response'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Skeleton } from '../ui/skeleton'
import { ChevronRight } from 'lucide-react'

export default function NewUpdateMovie() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  const fetchNewMovies = async () => {
    try {
      const res = await movieApi.getNewMovies({})
      if (isSuccessResponse(res)) {
        return res.items
      }
      console.error('Failed to fetch new movies:', res.msg)
      return null
    } catch (error) {
      console.error('Failed to fetch new movies:', error)
      return null
    }
  }

  const { isLoading, data } = useFetchData({
    queryKey: ['listNewMovie'],
    queryFn: fetchNewMovies,
  })

  return (
    <div className='flex flex-col gap-3 w-[360px] max-sm:w-full max-xl:w-[289px]'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg uppercase font-semibold line-clamp-1'>
          <span className='text-secondary-color'>Phim mới </span> Nổi bật
        </h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <Link
            href={`/danh-sach/phim-moi?page=1`}
            className='text-sm opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
          >
            Xem thêm
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
      {/* List */}
      <div
        className={`${isMobile && 'max-h-[450px]'} rounded-sm bg-black bg-opacity-30 overflow-auto p-3 flex flex-col gap-3 
        scrollbar-thin scrollbar-thumb-zinc-950 scrollbar-track-transparent`}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className='h-[90px] max-md:min-h-[90px] flex gap-4 overflow-hidden'
              >
                <Skeleton className='w-[80px] h-full bg-skeleton rounded-none' />
                <div className='relative w-full flex flex-col gap-1 flex-1 py-2'>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className='w-full h-[10px] bg-skeleton'
                    />
                  ))}
                  <Skeleton className='w-[80px] h-[10px] bg-skeleton' />
                </div>
              </div>
            ))
          : data?.slice(0, 10).map((item) => (
              <div
                key={item._id}
                className='h-[90px] max-md:min-h-[90px] overflow-hidden'
              >
                <Link
                  href={`/phim/${item.slug}`}
                  className='w-full h-full flex gap-4 bg-black bg-opacity-0 hover:bg-opacity-50'
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
                    <span className='text-xs line-clamp-1 font-semibold'>{item.name}</span>
                    <span className='text-xs opacity-30 line-clamp-2'>{item.origin_name}</span>
                    <span className='text-xs opacity-30'>{item.year}</span>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  )
}
