'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import SkeletonCard from '@/components/common/skeleton-card'
import TablePagination from '@/components/table-pagination'
import isNotEmpty from '@/helpers/not-empty'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useMoviesByCate, useNewMovies } from '@/services/query-data'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface DetailProps {
  slug: string
  searchParams: { keyword: string; page: string }
}

const Detail = ({ slug, searchParams }: DetailProps) => {
  const queryClient = useQueryClient()

  // Get params
  const lastSegment = slug.split('/').pop() || ''
  const currentPage = searchParams.page || 1
  const moiCapNhatPath = lastSegment.includes('moi-cap-nhat')

  const { data: movies, isFetching: isFetchingMovies } = useMoviesByCate({
    category: lastSegment,
    page: currentPage,
    options: { enabled: !moiCapNhatPath },
  })
  const { data: newMovies, isFetching: isFetchingNewMovies } = useNewMovies({
    page: currentPage,
    options: { enabled: moiCapNhatPath },
  })

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
    if (isNotEmpty(movies))
      return movies?.breadCrumb[0]?.name.includes('Phim')
        ? movies?.breadCrumb[0]?.name
        : `Phim ${movies?.breadCrumb[0]?.name}`

    if (isNotEmpty(newMovies) && moiCapNhatPath) return 'Phim mới cập nhật'
  }

  const getBreadCrumb = () => {
    if (isNotEmpty(movies)) {
      return movies?.breadCrumb || []
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

  const hasMovies = isNotEmpty(movies?.items || newMovies?.items)
  const isLoading = isFetchingMovies || isFetchingNewMovies

  return (
    <>
      <BreadcrumbCustom breadCrumb={getBreadCrumb()} />

      <section className='grid gap-6'>
        <h2 className='text-3xl max-sm:text-xl font-semibold capitalize text-primary-color'>
          {renderTitle()}
        </h2>
        {hasMovies && !isLoading && (
          <TablePagination data={(movies || newMovies) as MovieCategoryItem} />
        )}
      </section>

      {isLoading && (
        <div className='grid lg:grid-cols-6 max-sm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-9 max-sm:gap-x-3'>
          <SkeletonCard itemLength={12} />
        </div>
      )}
    </>
  )
}

export default Detail
