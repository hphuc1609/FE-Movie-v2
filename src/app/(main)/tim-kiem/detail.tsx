'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import SkeletonCard from '@/components/common/skeleton-card'
import TablePagination from '@/components/table-pagination'
import isNotEmpty from '@/helpers/object-empty'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useMoviesSearch } from '@/services/query-data'
import { useEffect } from 'react'

interface DetailProps {
  searchParams: { keyword: string; page: string }
}

const Detail = ({ searchParams }: DetailProps) => {
  const keyword = searchParams.keyword
  const page = searchParams.page

  const {
    data: moviesSearch,
    isFetching: isLoadingSearch,
    refetch: refetchSearch,
  } = useMoviesSearch({ keyword, page })

  // Refetch list movie
  useEffect(() => {
    refetchSearch()
  }, [keyword, page, refetchSearch])

  const renderTitle = () => {
    if (isNotEmpty(moviesSearch)) {
      if (moviesSearch?.items.length === 0) return

      return `Phim ${moviesSearch?.breadCrumb[0]?.name
        .replace(/ - Trang \d/g, '')
        .split(':')
        .pop()}`
    }
  }

  const getBreadCrumb = () => {
    if (isNotEmpty(moviesSearch)) {
      return moviesSearch?.breadCrumb || []
    }
    return '...'
  }

  const hasMovies = isNotEmpty(moviesSearch?.items)

  return (
    <>
      <BreadcrumbCustom breadCrumb={getBreadCrumb()} />

      <section className='grid gap-6'>
        <h2 className='text-3xl max-sm:text-xl font-bold capitalize bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent'>
          {renderTitle()}
        </h2>
        {hasMovies && !isLoadingSearch && (
          <TablePagination data={moviesSearch as MovieCategoryItem} />
        )}
      </section>

      {isLoadingSearch && (
        <div className='grid lg:grid-cols-6 max-sm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-9 max-sm:gap-x-3'>
          <SkeletonCard itemLength={12} />
        </div>
      )}

      {!isLoadingSearch && !hasMovies && keyword && (
        <p className='text-2xl font-medium'>Không tìm thấy phim: {keyword}</p>
      )}
    </>
  )
}

export default Detail
