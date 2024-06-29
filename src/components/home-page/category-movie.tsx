/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import movieApi from '@/api-client/movie'
import isSuccessResponse from '@/helpers/check-response'
import { MovieCategoryItem } from '@/models/list-movie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import CardImage from '../common/card-image'
import { useLoading } from '../loading-provider'

interface CategoryMovieProps {
  paramCategory: string
}

export default function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory } = props
  const [dataMovie, setDataMovie] = useState({} as MovieCategoryItem)
  const loader = useLoading()

  const getMoviesByCate = async (category: string) => {
    loader.show()
    try {
      const newData = await movieApi.getList({ category })
      if (isSuccessResponse(newData)) {
        setDataMovie(newData.data)
      } else {
        console.error('Lỗi khi tải danh sách phim: ', newData.message)
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim: ', error)
    } finally {
      loader.hidden()
    }
  }

  useEffect(() => {
    if (!paramCategory) return
    getMoviesByCate(paramCategory)
  }, [paramCategory])

  return (
    <MovieRowItem
      data={dataMovie}
      paramCategory={paramCategory}
    />
  )
}

interface MovieRowItemProps {
  data: MovieCategoryItem
  paramCategory: string
}

function MovieRowItem(props: MovieRowItemProps) {
  const { data, paramCategory } = props
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  return (
    <div className='flex-1 flex flex-col gap-6'>
      {/* Heading */}
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl max-md:text-2xl font-semibold uppercase text-primary-color'>
          {data.titlePage}
        </h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <Link
            href={`/danh-sach/${paramCategory}`}
            className='text-xs font-medium uppercase hover:text-primary-color text-nowrap'
          >
            Xem thêm
          </Link>
        </div>
      </div>
      {/* Data Grid */}
      <div className='grid grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-4 gap-[30px] max-lg:gap-x-4 max-md:gap-x-6'>
        <CardImage
          data={data}
          paramCategory={paramCategory}
          itemLength={isTabletOrMobile ? data.items?.length : 6}
        />
      </div>
    </div>
  )
}
