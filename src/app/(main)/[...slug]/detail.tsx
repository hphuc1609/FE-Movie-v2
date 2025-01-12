'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/table-pagination'
import isNotEmpty from '@/helpers/object-empty'
import { MovieCategory } from '@/models/interfaces/list'
import { useMemo } from 'react'

interface DetailProps {
  data: MovieCategory
  slug: string[]
  page: string
}

const Detail = ({ data, slug, page }: DetailProps) => {
  // Get params
  const isPhimMoiCapNhat = slug.includes('phim-moi-cap-nhat')

  const filteredMovies = useMemo(() => {
    if (['phim-moi-cap-nhat', 'phim-18'].includes(slug[slug.length - 1])) return data

    const items =
      data.items?.filter((movie) => !movie.category.some((cat) => cat.slug === 'phim-18')) || []
    return { ...data, items }
  }, [data, slug])

  const renderTitle = () => {
    if (isPhimMoiCapNhat) return 'Phim mới cập nhật'
    if (isNotEmpty(data))
      return data.titlePage?.includes('Phim') ? data.titlePage : `Phim ${data.titlePage}`
    return '...'
  }

  const getBreadCrumb = () => {
    if (isPhimMoiCapNhat)
      return [
        {
          isCurrent: false,
          name: 'Phim mới cập nhật',
          slug: '/phim-moi-cap-nhat',
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
        <h1 className='text-3xl max-sm:text-2xl font-bold capitalize text-primary-color'>
          {renderTitle()}
        </h1>
        <TablePagination data={filteredMovies} />
      </section>
    </>
  )
}

export default Detail
