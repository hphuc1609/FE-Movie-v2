'use client'

import { MovieCategoryItem } from '@/models/list-movie'
import { useMediaQuery } from 'react-responsive'
import CardImage from '../common/card-image'
import Link from 'next/link'

interface MovieRowProps {
  data: MovieCategoryItem
  paramCategory: string
}

export default function MovieRow(props: MovieRowProps) {
  const { data, paramCategory } = props
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  return (
    <div className='flex-1 flex flex-col gap-6'>
      {/* Heading */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold uppercase text-primary-color'>{data.titlePage}</h2>
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
      <div className='grid grid-cols-4 max-md:grid-cols-2 gap-[20px] max-lg:gap-x-4 max-md:gap-x-6'>
        <CardImage
          data={data}
          paramCategory={paramCategory}
          itemLength={isTabletOrMobile ? data.items?.length : 8}
        />
      </div>
    </div>
  )
}
