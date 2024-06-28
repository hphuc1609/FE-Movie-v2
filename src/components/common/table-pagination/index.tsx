import { MovieCategoryItem } from '@/models/list-movie'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import CardImage from '../card-image'
import PaginationCustom from './pagination'
import { useMemo } from 'react'

interface TablePaginationProps {
  category: string
  data: MovieCategoryItem
  keyword?: string
}

export default function TablePagination(props: TablePaginationProps) {
  const { category, data } = props
  const searchParams = useSearchParams()
  const currentPage = JSON.parse(searchParams.get('page') || '1')
  const pagination = data.params?.pagination || {}

  // Memoize the list of pages to prevent unnecessary re-renders
  const pagesToShow = useMemo(() => {
    const totalPages = pagination.totalPages
    let startPage = Math.max(1, currentPage - 1)
    let endPage = Math.min(totalPages, startPage + 2) // Show 3 pages in total

    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2) // Ensure we show 3 pages
    }

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }, [currentPage, pagination.totalPages])

  return (
    <>
      {data.items?.length > 0 ? (
        <div className='flex flex-col gap-20 pb-9'>
          <div className='grid grid-cols-5 gap-6 max-sm:grid-cols-2 max-md:grid-cols-3 max-xl:grid-cols-4 overflow-hidden'>
            <CardImage
              data={data}
              paramCategory={category}
              itemLength={pagination.totalItemsPerPage}
            />
          </div>
          <PaginationCustom
            pageToShow={pagesToShow}
            category={category}
            currentPage={currentPage}
            pagination={pagination}
          />
        </div>
      ) : (
        <>
          <p className='text-center text-3xl'>
            <span className='text-primary-color'>Không tìm thấy kết quả tìm kiếm: </span>
            {props.keyword}
          </p>
          <Link
            href={'/'}
            className='text-center text-lg underline text-primary-color'
          >
            Quay lại trang chủ
          </Link>
        </>
      )}
    </>
  )
}
