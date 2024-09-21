'use client'

import openRandomAdLink from '@/helpers/handle-ads'
import { cn } from '@/lib/utils'
import { MovieCategoryItem, MovieCategoryResponse, MovieItem } from '@/models/interfaces/list-movie'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PlayButton from './play-button'

interface CardImageProps {
  data: MovieCategoryResponse['data']
  itemLength?: number
}

export default function CardImage(props: CardImageProps) {
  const { data, itemLength = 8 } = props

  return (
    <>
      {data.items?.slice(0, itemLength).map((item, index) => (
        <div
          key={item._id}
          className='h-fit flex flex-col gap-3'
        >
          <Link
            href={`/phim/${item.slug}`}
            className='relative group bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'
            onClick={openRandomAdLink}
          >
            <ImageComponent
              item={item}
              index={index}
              data={data}
            />
            <div className='absolute w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
            <PlayButton
              PlayIconProps={{ size: 25 }}
              className='w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px] opacity-0 group-hover:opacity-100 transition-all duration-300'
            />
            <p className='absolute top-1 left-1 text-xs max-sm:text-[10px] font-semibold bg-label-color opacity-85 px-2 py-[2px] max-sm:px-1 rounded-[2px] text-nowrap'>
              {item.episode_current ? item.episode_current : 'Full'}
            </p>
          </Link>
          {/* Movie name */}
          <Link
            href={`/phim/${item.slug}`}
            className='text-sm max-md:text-xs grid gap-1'
          >
            <p className='hover:text-primary-color font-semibold line-clamp-2'>
              {item.name} ({item.year})
            </p>
            <span className='text-white text-opacity-50 line-clamp-2 hover:text-primary-color break-keep'>
              {item.origin_name}
            </span>
          </Link>
          {/* Categories */}
          {item.category && (
            <div className='flex items-center flex-wrap gap-1 max-md:hidden'>
              {item.category.map((cate) => (
                <Link
                  key={cate.id}
                  href={`/danh-sach/${cate.slug}?page=1`}
                  className={cn(
                    'text-[10px] font-medium rounded-xl bg-slate-100 bg-opacity-5 hover:text-primary-color px-2 py-1',
                    cate.slug.toLowerCase() === 'dang-cap-nhat' && 'pointer-events-none',
                  )}
                >
                  {cate.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

interface ImageComponentProps {
  index: number
  item: MovieItem
  data: MovieCategoryItem
  ImageProps?: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'priority'>
}

export const ImageComponent = React.memo((props: ImageComponentProps) => {
  const { index, item, data } = props
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const imageUrl = (item: MovieItem, index: number) => {
    const hasError = errorImage[index]
    const posterUrl = hasError ? item.thumb_url : item.poster_url
    return posterUrl ? `${data.APP_DOMAIN_CDN_IMAGE}/${posterUrl}` : ''
  }

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <Image
      {...props.ImageProps}
      src={imageUrl(item, index)}
      alt={item.name}
      width={275}
      height={275}
      priority
      onError={() => handleErrorImage(index)}
      className={cn(
        'object-cover group-hover:scale-110 md:min-h-[250px] max-h-[270px] max-[400px]:h-[150px] w-full transition-all duration-500',
        `${props.ImageProps?.className}`,
      )}
    />
  )
})

ImageComponent.displayName = 'ImageComponent'
