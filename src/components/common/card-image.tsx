'use client'

import openRandomAdLink from '@/helpers/handle-ads'
import imageUrl from '@/helpers/imgUrl'
import useLazyLoadImg from '@/hooks/useLazyImage'
import { cn } from '@/lib/utils'
import { MovieCategory, MovieItem } from '@/models/interfaces/list'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import PlayButton from './play-button'
import { Play } from 'lucide-react'

interface CardImageProps {
  data: MovieCategory
  itemLength?: number
}

interface ImageComponentProps {
  index: number
  item: MovieItem
  ImageProps?: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'priority'>
}

const CardImage = (props: CardImageProps) => {
  const { data, itemLength = 8 } = props

  const handleNavigate = (item: MovieItem) => {
    return `/phim/${item.slug}`
  }

  return (
    <>
      {(data.items || data).slice(0, itemLength).map((item, index) => (
        <div
          key={item._id}
          className='flex flex-col'
        >
          <Link
            title={item.name}
            href={handleNavigate(item)}
            className='relative group bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden shadow-black/50 shadow-lg'
            onClick={openRandomAdLink}
          >
            <ImageComponent
              item={item}
              index={index}
            />
            <div className='absolute w-full h-full bg-black/0 transition-all flex group-hover:bg-black/50'>
              <Play
                size={50}
                fill='currentColor'
                className='m-auto group-hover:block hidden border border-white rounded-full p-2'
              />
            </div>
            <div className='absolute top-1 bottom-1 left-1 right-1 flex flex-col gap-1 text-xs max-sm:text-xs font-medium'>
              {item.lang && (
                <span className='w-fit bg-gradient-to-r from-orange-700 to-yellow-500 px-2 py-1 rounded-sm line-clamp-1'>
                  {item.quality} {item.lang.split('+')[0]}
                </span>
              )}
              {item.episode_current?.toLowerCase() !== 'full' && (
                <span
                  className={cn(
                    'w-fit bg-gradient-to-r from-orange-700 to-yellow-500 px-2 py-1 rounded-sm line-clamp-1',
                    { hidden: !item.episode_current },
                  )}
                >
                  {item.episode_current}
                </span>
              )}
            </div>
          </Link>

          {/* Movie name */}
          <h3 className='text-sm max-sm:text-xs hover:text-primary-color font-semibold line-clamp-2 mt-3'>
            <Link
              href={handleNavigate(item)}
              title={item.name}
            >
              {item.name} ({item.year})
            </Link>
          </h3>
          <h3 className='text-sm max-sm:text-xs text-white/50 line-clamp-2 hover:text-primary-color mt-1'>
            <Link
              href={handleNavigate(item)}
              title={item.origin_name}
            >
              {item.origin_name}
            </Link>
          </h3>

          {/* Category tags */}
          <div className='flex items-center gap-1 mt-3'>
            {item.category?.slice(0, 2).map(
              (cate) =>
                cate.name && (
                  <Link
                    key={cate.id}
                    href={`/the-loai/${cate.slug}`}
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
export default CardImage

export const ImageComponent = React.memo((props: ImageComponentProps) => {
  const { index, item } = props
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const imgRef = useRef<HTMLImageElement>(null)
  const isLoadedImage = useLazyLoadImg(imgRef)

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <Image
      {...props.ImageProps}
      ref={imgRef}
      src={imageUrl(item, errorImage[index])}
      alt={item.name}
      width={270}
      height={180}
      loading='lazy'
      onError={() => handleErrorImage(index)}
      className={cn(
        'object-cover group-hover:scale-110 aspect-[2/3] w-full transition-all duration-500',
        !isLoadedImage && 'blur-md',
      )}
    />
  )
})

ImageComponent.displayName = 'ImageComponent'
