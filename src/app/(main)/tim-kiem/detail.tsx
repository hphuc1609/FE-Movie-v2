'use client'

import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import TablePagination from '@/components/table-pagination'
import isNotEmpty from '@/helpers/object-empty'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'

interface DetailProps {
  data: MovieCategoryItem
  keyword: string
}

const Detail = ({ data, keyword }: DetailProps) => {
  const renderTitle = () => {
    if (isNotEmpty(data)) {
      if (data.items.length === 0) return

      return `Phim ${data.breadCrumb[0]?.name
        .replace(/ - Trang \d/g, '')
        .split(':')
        .pop()}`
    }
  }

  const getBreadCrumb = () => {
    if (isNotEmpty(data)) {
      return data.breadCrumb
    }
    return '...'
  }

  return (
    <>
      <BreadcrumbCustom breadCrumb={getBreadCrumb()} />
      <section className='grid gap-6'>
        <h1 className='text-3xl max-sm:text-xl font-bold capitalize bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent'>
          {renderTitle()}
        </h1>
        {isNotEmpty(data.items) && <TablePagination data={data} />}
        <p
          className='text-2xl font-medium'
          hidden={isNotEmpty(data.items)}
        >
          Không tìm thấy phim: {keyword}
        </p>
      </section>
    </>
  )
}

export default Detail
