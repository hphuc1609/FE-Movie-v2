'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/table-pagination'
import SkeletonCard from '@/components/common/skeleton-card'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useMoviesByCate, useMoviesSearch, useNewMovies } from '@/services/query-data'
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
  const moiCapNhatPath = lastSegment.includes('moi-cap-nhat')

  const isNotEmpty = (obj: any) => obj && Object.keys(obj).length > 0

  const { data: movies, isFetching: isFetchingMovies } = useMoviesByCate({
    category: lastSegment,
    page: currentPage,
    options: { enabled: !moiCapNhatPath },
  })
  const { data: newMovies, isFetching: isFetchingNewMovies } = useNewMovies({
    page: currentPage,
    options: { enabled: moiCapNhatPath },
  })
  const { data: moviesSearch, isLoading: isLoadingSearch } = useMoviesSearch(keyword)

  // Refetch list movie
  useEffect(() => {
    const refetch = async () => {
      if (lastSegment.includes('moi-cap-nhat')) {
        await queryClient.refetchQueries({ queryKey: ['newMovies'] })
      } else {
        await queryClient.refetchQueries({ queryKey: ['movies', { category: lastSegment }] })
      }
    }
    refetch()
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

    if (isNotEmpty(newMovies) && moiCapNhatPath) return 'Phim mới cập nhật'
  }

  const getBreadCrumb = () => {
    if (isNotEmpty(moviesSearch) || isNotEmpty(movies)) {
      return moviesSearch?.breadCrumb || movies?.breadCrumb || []
    }

    if (isNotEmpty(newMovies))
      return [
        {
          isCurrent: false,
          name: 'Phim mới cập nhật',
          slug: '/danh-sach/phim-moi-cap-nhat',
        },
        {
          isCurrent: true,
          name: `Trang ${currentPage}`,
        },
      ]
    return '...'
  }

  const hasMovies = isNotEmpty(moviesSearch?.items || movies?.items || newMovies?.items)
  const isLoading = isLoadingSearch || isFetchingMovies || isFetchingNewMovies

  return (
    <>
      <BreadcrumbCustom breadCrumb={getBreadCrumb()} />

      <section className='grid gap-6'>
        <h1 className='text-3xl max-sm:text-xl font-semibold capitalize'>{renderTitle()}</h1>
        {hasMovies && !isLoading && (
          <TablePagination data={(moviesSearch || movies || newMovies) as MovieCategoryItem} />
        )}
      </section>

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
