'use client'

import { MovieCategoryItem } from '@/models/list-movie'
import Image from 'next/image'
import Link from 'next/link'
import PlayButton from './play-button'
import { useState } from 'react'

interface CardImageProps {
  data: MovieCategoryItem
  paramCategory?: string
  itemLength?: number
}

export default function CardImage(props: CardImageProps) {
  const { data, paramCategory, itemLength = 6 } = props
  const [errorImage, setErrorImage] = useState(false)

  return (
    <>
      {data.items?.length > 0 &&
        data.items.slice(0, itemLength).map((item) => (
          <div
            key={item._id}
            className='h-fit flex flex-col gap-2 overflow-hidden'
          >
            <div className='relative group rounded-sm bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'>
              <div className='group-hover:scale-110 h-[275px] w-full transition-all duration-500'>
                <Image
                  src={
                    data.APP_DOMAIN_CDN_IMAGE
                      ? `${data.APP_DOMAIN_CDN_IMAGE}/${!errorImage ? item.poster_url : item.thumb_url}`
                      : item.poster_url
                  }
                  alt={item.name}
                  width={478}
                  height={325}
                  priority
                  onError={() => setErrorImage(true)}
                  className='w-full h-full object-cover'
                />
              </div>
              <Link
                href={`/phim/${item.slug}`}
                className='absolute top-0 left-0 w-full h-full'
              >
                <div className='w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
                <PlayButton
                  PlayIconProps={{ size: 25 }}
                  className='w-[50px] h-[50px] opacity-0 group-hover:opacity-100 transition-all duration-300'
                />
              </Link>
              <div className='text-[10px] font-semibold uppercase absolute top-0 p-1 w-full flex flex-col gap-1 items-baseline'>
                <p className='bg-label-color w-fit py-1 px-2 text-nowrap'>
                  {item.quality ? `${item.quality} ${item.lang}` : 'HD Vietsub'}
                </p>
                {paramCategory === 'phim-bo' && item.episode_current && (
                  <p className='bg-label-color w-fit py-1 px-2'>{item.episode_current}</p>
                )}
              </div>
            </div>
            {item.category && (
              <div className='flex items-center flex-wrap gap-1'>
                {item.category.map((cate) => (
                  <div
                    key={cate.id}
                    className='w-fit text-[10px] font-medium rounded-xl bg-slate-100 bg-opacity-10 px-2 py-1'
                  >
                    {cate.name}
                  </div>
                ))}
              </div>
            )}
            <Link
              href={`/phim/${item.slug}`}
              className='text-sm'
            >
              {item.name} ({item.year})
            </Link>
          </div>
        ))}
    </>
  )
}
