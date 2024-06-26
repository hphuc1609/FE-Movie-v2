'use client'

import movieApi from '@/api-client/movie'
import isSuccessResponse from '@/helpers/check-response'
import { MovieCategoryItem } from '@/models/list-movie'
import { CirclePlay, MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CategoryMovieProps {
  paramCategory: string
}

export default function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory } = props
  const [dataMovie, setDataMovie] = useState({} as MovieCategoryItem)

  const getMoviesByCate = async (category: string) => {
    try {
      const newData = await movieApi.getListCate({ category })
      if (isSuccessResponse(newData)) {
        setDataMovie(newData.data)
      } else {
        console.error('Lỗi khi tải danh sách phim: ', newData.message)
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim: ', error)
    }
  }

  useEffect(() => {
    getMoviesByCate(paramCategory)
  }, [paramCategory])

  return (
    <MovieRowItem
      data={dataMovie}
      category={paramCategory}
    />
  )
}

interface MovieRowItemProps {
  data: MovieCategoryItem
  category: string
}

function MovieRowItem(props: MovieRowItemProps) {
  const { data, category } = props

  return (
    <div className='w-fit flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold uppercase text-primary-color'>{data.titlePage}</h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <p className='text-xs font-medium uppercase'>Tất cả</p>
          <MoveRight size={20} />
        </div>
      </div>

      <div className='grid grid-cols-3 max-md:grid-cols-2 gap-x-[30px] max-lg:gap-y-9 max-md:gap-x-6'>
        {data.items?.length > 0 &&
          data.items.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className='w-[230px] h-[478px] max-lg:h-fit max-lg:w-[160px] flex flex-col gap-5'
            >
              <div className='relative group h-[325px] max-lg:h-[260px] rounded-md bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'>
                <div className='group-hover:scale-110 h-full w-full transition-all duration-500'>
                  <Image
                    src={`${data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`}
                    alt={item.name}
                    width={478}
                    height={325}
                    priority
                    className='w-full h-full object-cover'
                  />
                </div>
                <Link
                  href={`/phim/${item.slug}`}
                  className='absolute top-0 left-0 w-full h-full bg-black opacity-0 cursor-pointer transition-all duration-300 group-hover:opacity-50'
                >
                  <CirclePlay
                    size={60}
                    strokeWidth={1}
                    className='m-auto h-full'
                  />
                </Link>
                <div className='absolute top-3 left-3 right-3 flex flex-col gap-1 w-fit items-baseline'>
                  <p className='bg-label-color text-xs w-fit font-medium rounded-sm py-1 px-2'>
                    {item.quality} {item.lang}
                  </p>
                  {category === 'phim-bo' && (
                    <p className='bg-label-color w-fit text-xs font-medium rounded-sm py-1 px-2'>
                      {item.episode_current}
                    </p>
                  )}
                </div>
              </div>
              <Link href={`/phim/${item.slug}`}>
                {item.name} ({item.year})
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
