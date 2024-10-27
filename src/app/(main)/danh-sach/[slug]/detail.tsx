'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/table-pagination'
import isNotEmpty from '@/helpers/object-empty'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'

interface DetailProps {
  data: MovieCategoryItem
  slug: string
  page: string
}

const Detail = ({ data, slug, page }: DetailProps) => {
  // Get params
  const lastSegment = slug.split('/').pop() || ''
  const moiCapNhatPath = lastSegment.includes('moi-cap-nhat')

  const renderTitle = () => {
    if (moiCapNhatPath) return 'Phim mới cập nhật'

    if (isNotEmpty(data))
      return data.titlePage.includes('Phim') ? data.titlePage : `Phim ${data.titlePage}`
  }

  const getBreadCrumb = () => {
    if (moiCapNhatPath)
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
        <h2 className='text-3xl max-sm:text-xl font-bold capitalize bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-500 bg-clip-text text-transparent'>
          {renderTitle()}
        </h2>
        <TablePagination data={data} />
      </section>
    </>
  )
}

export default Detail
