'use client'

import { MovieCategoryItem, MovieCategoryResponse, MovieItem } from '@/models/list-movie'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PlayButton from './play-button'
import cleanString from '@/helpers/cleanString'
import { useLoading } from '../loading-provider'

interface CardImageProps {
  data: MovieCategoryResponse['data']
  paramCategory?: string
  itemLength?: number
}

const AD_URL = process.env.NEXT_PUBLIC_AD_URL
const AD_INTERVAL = 3600000 // 1 hour in milliseconds

export default function CardImage(props: CardImageProps) {
  const { data, paramCategory, itemLength = 6 } = props
  const loader = useLoading()

  const handleCardClick = () => {
    loader.show()

    const lastAdShown = localStorage.getItem('lastAdShown')
    const now = Date.now()

    // Check if the last ad was shown less than an hour ago
    if (!lastAdShown || now - Number(lastAdShown) > AD_INTERVAL) {
      localStorage.setItem('lastAdShown', now.toString())
      window.open(AD_URL, '_blank', 'noopener,noreferrer')
    }
  }

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
            onClick={handleCardClick}
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
            <div className='text-[11px] font-semibold uppercase absolute top-0 w-full flex flex-col gap-1 items-baseline'>
              {paramCategory === 'phim-bo' ? (
                item.episode_current && (
                  <p className='bg-label-color w-fit py-1 px-2'>{item.episode_current}</p>
                )
              ) : (
                <p className='bg-label-color w-fit py-1 px-2 text-nowrap'>
                  {item.quality ? `${item.quality} ${item.lang}` : 'HD Vietsub'}
                </p>
              )}
            </div>
          </Link>
          {/* Subtitle */}
          <Link
            href={`/phim/${item.slug}`}
            className='text-sm grid gap-1'
          >
            <p className='hover:text-primary-color font-semibold line-clamp-2'>
              {item.name} ({item.year})
            </p>
            <span className='text-white text-opacity-50 line-clamp-2 hover:text-primary-color break-keep'>
              {cleanString(item.origin_name)}
            </span>
          </Link>
          {item.category && (
            <div className='flex items-center flex-wrap gap-1'>
              {item.category.map((cate) => (
                <Link
                  href={`/danh-sach/${cate.slug}?page=1`}
                  key={cate.id}
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
  item: MovieItem
  index: number
  data: MovieCategoryItem
}

export const ImageComponent = React.memo(({ item, index, data }: ImageComponentProps) => {
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const imageUrl = (item: MovieItem, index: number) => {
    const hasError = errorImage[index]
    return hasError && data.APP_DOMAIN_CDN_IMAGE
      ? `${data.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`
      : data.APP_DOMAIN_CDN_IMAGE
        ? `${data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`
        : !errorImage
          ? item.poster_url
          : item.thumb_url
  }

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <Image
      src={imageUrl(item, index)}
      alt={item.name}
      width={275}
      height={275}
      priority
      onError={() => handleErrorImage(index)}
      className='object-cover group-hover:scale-110 h-[270px] max-[400px]:h-[220px] w-full transition-all duration-500'
    />
  )
})

ImageComponent.displayName = 'ImageComponent'
