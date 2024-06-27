import { MovieCategoryItem } from '@/models/list-movie'
import Image from 'next/image'
import Link from 'next/link'
import PlayButton from './play-button'

interface CardImageProps {
  data: MovieCategoryItem
  paramCategory?: string
  itemLength?: number
}

export default function CardImage(props: CardImageProps) {
  const { data, paramCategory, itemLength = 6 } = props
  return (
    <>
      {data.items?.length > 0 &&
        data.items.slice(0, itemLength).map((item) => (
          <div
            key={item._id}
            className='h-fit flex flex-col gap-4'
          >
            <div className='relative group h-[325px] max-xl:h-[260px] rounded-md bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'>
              <div className='group-hover:scale-110 h-full w-full transition-all duration-500'>
                <Image
                  src={
                    data.APP_DOMAIN_CDN_IMAGE
                      ? `${data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`
                      : item.poster_url
                  }
                  alt={item.name}
                  width={478}
                  height={325}
                  priority
                  className='w-full h-full object-cover'
                />
              </div>
              <Link
                href={`/phim/${item.slug}`}
                className='absolute top-0 left-0 w-full h-full'
              >
                <div className='w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
                <PlayButton className='w-14 h-14 opacity-0 group-hover:opacity-100 transition-all duration-300' />
              </Link>
              <div className='absolute top-3 left-3 right-3 flex flex-col gap-1 w-fit items-baseline'>
                {item.quality && (
                  <p className='bg-label-color text-xs w-fit font-medium py-1 px-2'>
                    {item.quality}
                  </p>
                )}
                {paramCategory === 'phim-bo' && (
                  <p className='bg-label-color w-fit text-xs font-medium py-1 px-2'>
                    {item.episode_current}
                  </p>
                )}
              </div>
            </div>
            {item.category && (
              <div className='flex items-center flex-wrap gap-1'>
                {item.category.map((cate) => (
                  <div
                    key={cate.id}
                    className='w-fit text-[10px] font-medium rounded-xl bg-gray-700 bg-opacity-50 px-2 py-1'
                  >
                    {cate.name}
                  </div>
                ))}
              </div>
            )}
            <Link href={`/phim/${item.slug}`}>
              {item.name} ({item.year})
            </Link>
          </div>
        ))}
    </>
  )
}
