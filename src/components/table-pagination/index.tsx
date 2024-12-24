'use client'

import { MovieCategoryItem } from '@/models/interfaces/list'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import CardImage from '../common/card-image'
import PaginationCustom from './pagination'

interface TablePaginationProps {
  data: MovieCategoryItem
}

const TablePagination = ({ data }: TablePaginationProps) => {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('page') || 1

  const dataPagination = data.pagination || data.params?.pagination

  // Memoize the list of pages to prevent unnecessary re-renders
  const pagesToShow = useMemo(() => {
    if (!dataPagination) return []

    const totalPages = dataPagination.totalPages
    const startPage = Math.max(1, Number(currentPage) - 2)
    const endPage = Math.min(totalPages, startPage + 3) // Show 4 pages in total

    const pages = [1] // Show first page
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1) {
        pages.push(i)
      }
    }

    // Show last page
    if (endPage < totalPages) {
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, dataPagination])

  return (
    <div className='flex flex-col gap-10 pb-5 overflow-hidden'>
      <div className='grid lg:grid-cols-6 max-sm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-9 max-sm:gap-x-3'>
        <CardImage
          data={data}
          itemLength={dataPagination?.totalItemsPerPage}
        />
      </div>
      {pagesToShow.length > 1 && (
        <PaginationCustom
          pagesToShow={pagesToShow}
          dataPagination={dataPagination}
        />
      )}
    </div>
  )
}

export default TablePagination
