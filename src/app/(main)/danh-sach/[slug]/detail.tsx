'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/table-pagination'
import SkeletonCard from '@/components/common/skeleton-card'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useMoviesByCate, useMoviesSearch } from '@/services/query-data'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface DetailProps {
  slug: string
  searchParams: { keyword?: string; page?: string }
}

const Detail = ({ slug, searchParams }: DetailProps) => {
  const queryClient = useQueryClient()

  // Get params
  const lastSegment = slug.split('/').pop() || ''
  const keyword = searchParams.keyword || ''
  const currentPage = searchParams.page || 1

  const isNotEmpty = (obj: any) => obj && Object.keys(obj).length > 0

  const { data: movies, isFetching: isFetchingMovies } = useMoviesByCate({
    category: lastSegment,
    page: currentPage,
  })
  const { data: moviesSearch, isLoading: isLoadingSearch } = useMoviesSearch(keyword)

  // Refetch list movie
  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: ['movies', { category: lastSegment }],
    })
  }, [currentPage, lastSegment, queryClient])

  const renderTitle = () => {
    if (isNotEmpty(moviesSearch)) {
      if (moviesSearch?.items.length === 0) return

      return `Phim ${moviesSearch?.breadCrumb[0]?.name
        .replace(/ - Trang 1/g, '')
        .split(':')
        .pop()}`
    }

    if (isNotEmpty(movies))
      return movies?.breadCrumb[0]?.name.includes('Phim')
        ? movies?.breadCrumb[0]?.name
        : `Phim ${movies?.breadCrumb[0]?.name}`
  }

  const getBreadCrumb = () => {
    if (isNotEmpty(moviesSearch) || isNotEmpty(movies)) {
      return moviesSearch?.breadCrumb || movies?.breadCrumb || []
    }
    return '...'
  }

  const hasMovies = isNotEmpty(moviesSearch?.items || movies?.items)
  const isLoading = isLoadingSearch || isFetchingMovies

  return (
    <>
      <BreadcrumbCustom breadCrumb={getBreadCrumb()} />

      {hasMovies && !isLoading && (
        <div className='grid gap-6'>
          <h1 className='text-3xl max-sm:text-xl font-semibold capitalize'>{renderTitle()}</h1>
          <TablePagination data={(moviesSearch || movies) as MovieCategoryItem} />
        </div>
      )}
      {isLoading && (
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
