'use client'

import { MovieCategoryItem, MovieCategoryResponse, MovieItem } from '@/models/interfaces/list-movie'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PlayButton from './play-button'
import openRandomAdLink from '@/helpers/handle-ads'
import { cn } from '@/lib/utils'

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
          className='h-fit flex flex-col gap-3 overflow-hidden'
        >
          <Link
            href={`/phim/${item.slug}`}
            className='relative group rounded-sm bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'
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
              className='w-[50px] h-[50px] opacity-0 group-hover:opacity-100 transition-all duration-300'
            />
            <p className='absolute top-2 left-1 text-[12px] font-semibold bg-label-color opacity-85 px-2 py-[2px] rounded'>
              {item.episode_current}
            </p>
          </Link>
          {/* Movie name */}
          <Link
            href={`/phim/${item.slug}`}
            className='text-sm grid gap-1'
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
            <div className='flex items-center flex-wrap gap-1'>
              {item.category.map((cate) => (
                <Link
                  key={cate.id}
                  href={`/danh-sach/${cate.slug}?page=1`}
                  className='text-[10px] font-medium rounded-xl bg-slate-100 bg-opacity-5 hover:text-primary-color px-2 py-1'
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
        'object-cover group-hover:scale-110 h-[270px] max-[400px]:h-[180px] w-full transition-all duration-500',
        `${props.ImageProps?.className}`,
      )}
    />
  )
})

ImageComponent.displayName = 'ImageComponent'
