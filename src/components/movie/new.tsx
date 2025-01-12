'use client'

import imageUrl from '@/helpers/imgUrl'
import { NewMovieResponse } from '@/models/interfaces/new-movie'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface NewUpdateMoviesProps {
  data: NewMovieResponse
}

const NewUpdateMovies = ({ data }: NewUpdateMoviesProps) => {
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <section className='flex flex-col gap-3 w-[360px] max-lg:flex-2 max-[950px]:hidden'>
      <h2 className='text-xl uppercase font-bold text-primary-color'>Phim đề cử</h2>
      <div className='rounded-sm bg-black bg-opacity-30 overflow-auto p-3 flex flex-col gap-3'>
        {data.items.map((item, index) => (
          <Link
            key={item._id}
            href={`/phim/${item.slug}`}
            className='w-full h-[90px] max-md:min-h-[90px] overflow-hidden flex gap-3 bg-black bg-opacity-0 hover:bg-opacity-30'
          >
            <Image
              src={imageUrl(item, errorImage[index])}
              alt={item.name}
              width={80}
              height={90}
              loading='lazy'
              onError={() => handleErrorImage(index)}
              className='w-[80px] h-full bg-gray-50/10 object-cover'
            />
            <div className='relative flex flex-col gap-1 flex-1 py-2'>
              <p className='text-[13px] line-clamp-1 font-semibold'>{item.name}</p>
              <p className='text-xs opacity-50 line-clamp-2'>{item.origin_name}</p>
              <p className='text-xs opacity-50'>{item.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default NewUpdateMovies
