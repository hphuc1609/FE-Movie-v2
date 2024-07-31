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
import { useState } from 'react'

export default function NewUpdateMovie() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const loader = useLoading()
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

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

  // ------------------ Image Url ----------------------------
  const imageUrl = (item: NewMovieItem, index: number) => {
    const hasError = errorImage[index]
    return hasError ? item.thumb_url : item.poster_url
  }

  // ------------------ Event Handlers ----------------------------
  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  // ----------------- Render UI -------------------------
  return (
    <section className='flex flex-col gap-3 w-[360px] max-sm:w-full max-xl:w-[289px] max-lg:hidden'>
      <header className='flex items-center justify-between'>
        <h2 className='text-xl uppercase font-semibold line-clamp-1 text-primary-color'>
          Phim đề cử
        </h2>
        {!isLoading && (
          <Link
            href={`/danh-sach/phim-moi?page=1`}
            className='text-sm text-white text-opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
            onClick={() => loader.show()}
            aria-label='Xem thêm phim mới cập nhật'
          >
            Xem thêm
            <ChevronRight size={16} />
          </Link>
        )}
      </header>
      {/* List */}
      <div
        className={`${isMobile && 'max-h-[450px]'} rounded-sm bg-black bg-opacity-30 overflow-auto p-3 flex flex-col gap-3`}
      >
        {isLoading ? (
          <SkeletonList />
        ) : (
          data?.slice(0, 10).map((item, index) => (
            <article
              key={item._id}
              className='h-[90px] max-md:min-h-[90px] overflow-hidden'
              aria-labelledby={`movie-${item._id}`}
            >
              <Link
                href={`/phim/${item.slug}`}
                className='w-full h-full flex gap-3 bg-black bg-opacity-0 hover:bg-opacity-50'
                onClick={() => loader.show()}
                aria-label={`Xem chi tiết phim ${item.name}`}
              >
                <figure className='w-[80px] h-full bg-gray-50 bg-opacity-10'>
                  <Image
                    src={imageUrl(item, index)}
                    alt={`Poster của phim ${item.name}`}
                    width={80}
                    height={90}
                    priority
                    onError={() => handleErrorImage(index)}
                    className='object-cover h-full w-full'
                  />
                </figure>
                <div className='relative flex flex-col gap-1 flex-1 py-2'>
                  <h3
                    id={`movie-${item._id}`}
                    className='text-[13px] line-clamp-1 font-semibold'
                  >
                    {item.name}
                  </h3>
                  <p className='text-xs opacity-50 line-clamp-2'>{item.origin_name}</p>
                  <p className='text-xs opacity-50'>{item.year}</p>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
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
