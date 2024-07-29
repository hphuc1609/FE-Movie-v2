'use client'

import { MovieCategoryItem } from '@/models/list-movie'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import CardImage from '../common/card-image'
import { useLoading } from '../loading-provider'

interface CategoryMovieProps {
  dataMovie: MovieCategoryItem
  paramCategory?: string
  title?: string
}

export default function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory, dataMovie, title } = props
  const loader = useLoading()
  const lowerCaseTitlePage = dataMovie.titlePage?.toLowerCase()
  const isPhimLeOrPhimBo = ['phim lẻ', 'phim bộ'].includes(lowerCaseTitlePage)

  return (
    <div className='flex-1 flex flex-col gap-9'>
      <div className='flex items-center justify-between'>
        <h2
          className={`text-3xl max-md:text-xl font-semibold uppercase ${title ? 'text-primary-color' : 'text-secondary-color'}`}
        >
          {title ?? (
            <>
              {dataMovie.titlePage}
              {isPhimLeOrPhimBo && <span className='text-white'> mới cập nhật</span>}
            </>
          )}
        </h2>
        {paramCategory && (
          <Link
            href={`/danh-sach/${paramCategory}?page=1`}
            className='text-sm text-white text-opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
            onClick={() => loader.show()}
          >
            Xem thêm
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
      <div className='grid grid-cols-4 max-md:grid-cols-2 gap-[20px] gap-y-7 max-lg:gap-x-4 max-md:gap-x-6'>
        <CardImage
          data={dataMovie}
          paramCategory={paramCategory}
          itemLength={dataMovie.items?.length}
        />
      </div>
    </div>
  )
}
