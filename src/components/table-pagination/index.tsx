import { MovieCategoryItem } from '@/models/interfaces/list-movie'
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

  const dataPagination = data.pagination || data.params.pagination

  // Kiểm tra xem pathname có chứa năm không (dạng yyyy)
  const containsYear = /\b\d{4}\b/.test(data.type_list)

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
    <section
      id='table-pagination'
      className='flex flex-col gap-10 pb-5 overflow-hidden'
    >
      <div className='grid grid-cols-6 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-5 gap-5 gap-y-9'>
        <CardImage
          data={data}
          itemLength={dataPagination.totalItemsPerPage}
        />
      </div>
      {pagesToShow.length > 1 && !containsYear && (
        <PaginationCustom
          pagesToShow={pagesToShow}
          dataPagination={dataPagination}
        />
      )}
    </section>
  )
}

export default TablePagination
