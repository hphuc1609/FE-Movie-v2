'use client'

import { NewMovieItem, NewMovieResponse } from '@/models/interfaces/new-movie'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Skeleton } from '../ui/skeleton'
import isNotEmpty from '@/helpers/object-empty'
import { cn } from '@/lib/utils'

interface NewUpdateMoviesProps {
  data: NewMovieResponse
}

const NewUpdateMovies = ({ data }: NewUpdateMoviesProps) => {
  const isMobile = useMediaQuery({ maxWidth: 750 })
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const imageUrl = (item: NewMovieItem, index: number) => {
    const hasError = errorImage[index]
    return hasError ? item.thumb_url : item.poster_url
  }

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <section className='flex flex-col gap-3 w-[360px] max-lg:flex-2 max-[950px]:hidden'>
      <header className='flex items-center justify-between'>
        <h3 className='text-xl uppercase font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent'>
          Phim đề cử
        </h3>
      </header>
      <article
        className={cn(`rounded-sm bg-black bg-opacity-30 overflow-auto p-3 flex flex-col gap-3`, {
          'max-h-[450px]': isMobile,
        })}
      >
        {!isNotEmpty(data)
          ? Array.from({ length: 8 }).map((_, index) => <SkeletonList key={index} />)
          : data.items.map((item, index) => (
              <Link
                key={item._id}
                href={`/phim/${item.slug}`}
                className='w-full h-[90px] max-md:min-h-[90px] overflow-hidden flex gap-3 bg-black bg-opacity-0 hover:bg-opacity-30'
              >
                <div className='w-[80px] h-full bg-gray-50 bg-opacity-10'>
                  <Image
                    src={imageUrl(item, index)}
                    alt={`Poster của phim ${item.name}`}
                    width={80}
                    height={90}
                    loading='lazy'
                    quality={80}
                    onError={() => handleErrorImage(index)}
                    className='object-cover h-full w-full'
                  />
                </div>
                <div className='relative flex flex-col gap-1 flex-1 py-2'>
                  <p
                    id={`movie-${item._id}`}
                    className='text-[13px] line-clamp-1 font-semibold'
                  >
                    {item.name}
                  </p>
                  <p className='text-xs opacity-50 line-clamp-2'>{item.origin_name}</p>
                  <p className='text-xs opacity-50'>{item.year}</p>
                </div>
              </Link>
            ))}
      </article>
    </section>
  )
}

const SkeletonList = () => {
  return (
    <div className='h-[90px] max-md:min-h-[90px] flex gap-4 overflow-hidden'>
      <Skeleton className='min-w-[80px] h-full bg-skeleton rounded-none' />
      <div className='relative w-full flex flex-col gap-1 py-2'>
        <Skeleton className='w-full h-[10px] bg-skeleton' />
        <Skeleton className='w-[200px] h-[10px] bg-skeleton' />
        <Skeleton className='w-[80px] h-[10px] bg-skeleton' />
      </div>
    </div>
  )
}

export default NewUpdateMovies
