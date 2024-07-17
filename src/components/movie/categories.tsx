import { MovieCategoryItem } from '@/models/list-movie'
import Link from 'next/link'
import CardImage from '../common/card-image'
import { ChevronRight, MoveRight } from 'lucide-react'

interface CategoryMovieProps {
  dataMovie: MovieCategoryItem
  paramCategory: string
  title?: string
}

export default async function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory, dataMovie, title } = props

  const lowerCaseTitlePage = dataMovie.titlePage?.toLowerCase()
  const isPhimLeOrPhimBo = ['phim lẻ', 'phim bộ'].includes(lowerCaseTitlePage)

  return (
    <div className='flex-1 flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl max-md:text-xl font-semibold uppercase text-secondary-color'>
          {title || isPhimLeOrPhimBo ? (
            <>
              {dataMovie.titlePage} <span className='text-white'>mới cập nhật</span>
            </>
          ) : (
            dataMovie.titlePage
          )}
        </h2>
        <Link
          href={`/danh-sach/${paramCategory}?page=1`}
          className='text-sm opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
        >
          Xem thêm
          <ChevronRight size={16} />
        </Link>
      </div>
      <div className='grid grid-cols-4 max-md:grid-cols-2 gap-[20px] max-lg:gap-x-4 max-md:gap-x-6'>
        <CardImage
          data={dataMovie}
          paramCategory={paramCategory}
          itemLength={dataMovie.items?.length}
        />
      </div>
    </div>
  )
}
