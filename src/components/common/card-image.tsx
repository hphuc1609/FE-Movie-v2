'use client'

import openRandomAdLink from '@/helpers/handle-ads'
import useLazyLoadImg from '@/hooks/useLazyImage'
import { cn } from '@/lib/utils'
import { MovieCategoryResponse, MovieItem } from '@/models/interfaces/list-movie'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import PlayButton from './play-button'

interface CardImageProps {
  data: MovieCategoryResponse['data']
  itemLength?: number
}

const CardImage = (props: CardImageProps) => {
  const { data, itemLength = 8 } = props

  const handleNavigate = (item: MovieItem) => {
    return `/phim/${item.slug}`
  }

  return (
    <>
      {(data?.items || data)?.slice(0, itemLength).map((item, index) => (
        <div
          key={item._id}
          className='h-fit flex flex-col gap-3'
        >
          <Link
            href={handleNavigate(item)}
            className='relative group bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden shadow-black/50 shadow-md'
            onClick={openRandomAdLink}
          >
            <ImageComponent
              item={item}
              index={index}
            />
            <div className='absolute w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
            <PlayButton
              PlayIconProps={{ size: 25 }}
              className='w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300'
            />
            {item.episode_current && (
              <p className='absolute top-1 left-1 right-1 w-fit text-xs max-sm:text-[8px] font-medium bg-gradient-to-r from-orange-600 to-yellow-500 px-2 py-[3px] max-sm:px-1 max-sm:py-[2px] rounded-[2px] line-clamp-1'>
                {item.episode_current.includes('Full') ? item.lang : item.episode_current}
              </p>
            )}
          </Link>
          {/* Movie name */}
          <Link
            title={item.name}
            href={handleNavigate(item)}
            className='text-sm max-[400px]:text-xs grid gap-1'
          >
            <p className='hover:text-primary-color font-semibold line-clamp-2'>
              {item.name} ({item.year})
            </p>
            <span className='text-white text-opacity-50 line-clamp-2 hover:text-primary-color break-keep'>
              {item.origin_name}
            </span>
          </Link>
          {/* Categories */}
          <div className='flex items-center gap-1 max-sm:hidden'>
            {item.category?.slice(0, 2).map(
              (cate) =>
                cate.name && (
                  <Link
                    key={cate.id}
                    href={`/danh-sach/${cate.slug}?page=1`}
                    className={cn(
                      'text-[10px] font-medium rounded-xl bg-slate-100/5 hover:text-primary-color px-2 py-1 text-nowrap',
                      cate.slug?.toLowerCase() === 'dang-cap-nhat' && 'pointer-events-none',
                    )}
                  >
                    {cate.name}
                  </Link>
                ),
            )}
          </div>
        </div>
      ))}
    </>
  )
}

interface ImageComponentProps {
  index: number
  item: MovieItem
  ImageProps?: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'priority'>
}

export const ImageComponent = React.memo((props: ImageComponentProps) => {
  const { index, item } = props

  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const imgRef = useRef<HTMLImageElement>(null)
  const isLoadedImage = useLazyLoadImg(imgRef)

  const imageUrl = (item: MovieItem, index: number) => {
    const hasError = errorImage[index]
    const posterUrl = hasError ? item.thumb_url : item.poster_url
    return posterUrl
      ? (item.thumb_url || item.poster_url).includes('https')
        ? posterUrl
        : `${process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE}/${posterUrl}`
      : ''
  }

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <Image
      {...props.ImageProps}
      ref={imgRef}
      src={imageUrl(item, index)}
      alt={item.name}
      width={270}
      height={180}
      loading='lazy'
      quality={80}
      onError={() => handleErrorImage(index)}
      className={cn(
        'object-cover group-hover:scale-110 aspect-[2/3] w-full transition-all duration-500',
        !isLoadedImage && 'blur-md',
      )}
    />
  )
})

ImageComponent.displayName = 'ImageComponent'

export default CardImage
