'use client'

import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useMoviesByCate } from '@/services/query-data'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import CardImage from '../common/card-image'
import SkeletonCard from '../common/skeleton-card'

interface CategoryMovieProps {
  category: string
  title?: string
}

export default function CategoryMovie(props: CategoryMovieProps) {
  const { category, title } = props
  const isPhimLeOrPhimBo = ['phim lẻ', 'phim bộ'].includes(title?.toLowerCase() || '')

  const { data: movieCate, isLoading: isLoadingList } = useMoviesByCate({ category })

  const filteredMovies = useMemo(() => {
    const items = movieCate?.items?.filter(
      (movie) => !movie.category.some((cat) => cat.slug === 'phim-18'),
    )
    return { ...movieCate, items }
  }, [movieCate])

  return (
    <section
      id={category}
      className='flex-1 flex flex-col gap-8 max-lg:gap-6'
    >
      <header className='flex items-center justify-between'>
        <h2 className={`text-3xl max-sm:text-lg font-semibold uppercase text-secondary-color`}>
          {title}
          {isPhimLeOrPhimBo && <span className='text-white'> mới cập nhật</span>}
        </h2>
        {!isLoadingList && category && (
          <Link
            href={`/danh-sach/${category}?page=1`}
            className='text-sm max-sm:text-xs text-white text-opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
          >
            Xem thêm
            <ChevronRight size={16} />
          </Link>
        )}
      </header>
      <div className='grid grid-cols-4 max-sm:grid-cols-3 gap-x-6 gap-y-7 max-sm:gap-x-3 '>
        {isLoadingList ? (
          <SkeletonCard />
        ) : (
          <CardImage data={filteredMovies as MovieCategoryItem} />
        )}
      </div>
    </section>
  )
}
