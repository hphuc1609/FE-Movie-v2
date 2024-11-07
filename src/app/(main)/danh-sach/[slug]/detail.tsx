'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/table-pagination'
import isNotEmpty from '@/helpers/object-empty'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useMemo } from 'react'

interface DetailProps {
  data: MovieCategoryItem
  slug: string
  page: string
}

const Detail = ({ data, slug, page }: DetailProps) => {
  // Get params
  const lastSegment = slug.split('/').pop() || ''
  const isPhimMoiCapNhat = lastSegment.includes('moi-cap-nhat')

  const filteredMovies = useMemo(() => {
    if (['phim-moi-cap-nhat', 'phim-18'].includes(lastSegment)) return data

    const items = data.items?.filter(
      (movie) => !movie.category.some((cat) => cat.slug === 'phim-18'),
    )
    return { ...data, items }
  }, [data, lastSegment])

  const renderTitle = () => {
    if (isPhimMoiCapNhat) return 'Phim mới cập nhật'

    if (isNotEmpty(data))
      return data.titlePage?.includes('Phim') ? data.titlePage : `Phim ${data.titlePage}`
  }

  const getBreadCrumb = () => {
    if (isPhimMoiCapNhat)
      return [
        {
          isCurrent: false,
          name: 'Phim mới cập nhật',
          slug: '/danh-sach/phim-moi-cap-nhat',
        },
        {
          isCurrent: true,
          name: `Trang ${page || 1}`,
        },
      ]

    if (isNotEmpty(data)) return data.breadCrumb

    return '...'
  }

  return (
    <>
      <BreadcrumbCustom breadCrumb={getBreadCrumb()} />
      <section className='grid gap-6'>
        <h1 className='text-3xl max-sm:text-xl font-bold capitalize bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-500 bg-clip-text text-transparent'>
          {renderTitle()}
        </h1>
        <TablePagination data={filteredMovies} />
      </section>
    </>
  )
}

export default Detail
