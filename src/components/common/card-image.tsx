'use client'

import { MovieCategoryItem, MovieItem } from '@/models/list-movie'
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
  return (
    <>
      {data.items?.slice(0, itemLength).map((item) => (
        <div
          key={item._id}
          className='h-fit flex flex-col gap-3 overflow-hidden'
        >
          <Link
            href={`/phim/${item.slug}`}
            className='relative group rounded-sm bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'
          >
            <ImageComponent
              item={item}
              data={data}
            />
            <div className='absolute w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
            <PlayButton
              PlayIconProps={{ size: 25 }}
              className='w-[50px] h-[50px] opacity-0 group-hover:opacity-100 transition-all duration-300'
            />
            <div className='text-[10px] font-semibold uppercase absolute top-0 p-1 w-full flex flex-col gap-1 items-baseline'>
              <p className='bg-label-color w-fit py-1 px-2 text-nowrap'>
                {item.quality ? `${item.quality} ${item.lang}` : 'HD Vietsub'}
              </p>
              {paramCategory === 'phim-bo' && item.episode_current && (
                <p className='bg-label-color w-fit py-1 px-2'>{item.episode_current}</p>
              )}
            </div>
          </Link>
          {item.category && (
            <div className='flex items-center flex-wrap gap-1'>
              {item.category.map((cate) => (
                <p
                  key={cate.id}
                  className='text-[10px] font-medium rounded-xl bg-slate-100 bg-opacity-10 px-2 py-1'
                >
                  {cate.name}
                </p>
              ))}
            </div>
          )}
          <Link
            href={`/phim/${item.slug}`}
            className='text-sm'
          >
            <p>
              {item.name} ({item.year})
            </p>
            <span className='opacity-50 line-clamp-3'>{item.origin_name}</span>
          </Link>
        </div>
      ))}
    </>
  )
}

interface ImageComponentProps {
  item: MovieItem
  data: MovieCategoryItem
}
const ImageComponent = ({ item, data }: ImageComponentProps) => {
  const [errorImage, setErrorImage] = useState(false)

  const imageUrl =
    errorImage && data.APP_DOMAIN_CDN_IMAGE
      ? `${data.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`
      : data.APP_DOMAIN_CDN_IMAGE
        ? `${data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`
        : !errorImage
          ? item.poster_url
          : item.thumb_url

  const handleError = () => {
    setErrorImage(true)
  }

  return (
    <Image
      src={imageUrl}
      alt={item.name}
      width={275}
      height={275}
      loading='lazy'
      onError={handleError}
      className='object-cover group-hover:scale-110 h-[270px] w-full transition-all duration-500'
    />
  )
}
