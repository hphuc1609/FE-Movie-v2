'use client'

import type { MovieCategory } from '@/models/interfaces/list'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import CardImage from '../common/card-image'

interface MovieCategoryProps {
  data: MovieCategory
  slug: string
  title: string
}

const MovieCategory = ({ title, data, slug }: MovieCategoryProps) => {
  const isPhimLeOrPhimBo = ['phim lẻ', 'phim bộ'].includes(title?.toLowerCase())

  const filteredMovies = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return {
      ...data,
      items: data.items
        .filter((movie) => !movie.category.some((cat) => cat.slug === 'phim-18'))
        .filter((movie) => movie.year >= currentYear - 1)
        .sort((a, b) => b.year - a.year),
    }
  }, [data])

  return (
    <section
      id={slug}
      className='flex-1 flex flex-col gap-8 max-lg:gap-6'
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-3xl max-sm:text-xl font-bold uppercase bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent'>
          {title}
          {isPhimLeOrPhimBo && <span className='text-white'> mới cập nhật</span>}
        </h3>
        <Link
          href={isPhimLeOrPhimBo ? `/${slug}` : `/the-loai/${slug}`}
          className='group text-sm max-sm:text-[11px] text-white text-opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
        >
          Xem tất cả
          <ChevronRight
            size={16}
            className='group-hover:animate-spin group-hover:translate-x-0.5'
          />
        </Link>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-7 max-sm:gap-x-4'>
        <CardImage
          data={filteredMovies as MovieCategory}
          itemLength={12}
        />
      </div>
    </section>
  )
}

export default MovieCategory
