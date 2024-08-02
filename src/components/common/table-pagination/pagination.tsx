import { useLoading } from '@/components/loading-provider'
import { Pagination, PaginationContent, PaginationEllipsis } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { MoviePagination } from '@/models/list-movie'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { memo } from 'react'

interface PaginationProps {
  pageToShow: MoviePagination['totalPages'][]
  pagination: MoviePagination
  currentPage: number
}

const PaginationCustom: React.FC<PaginationProps> = memo((props) => {
  const { pageToShow, pagination, currentPage } = props

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pagination.totalPages
  const loader = useLoading()

  const handleClick = (page: number) => {
    if (currentPage !== page) {
      loader.show()
    }
  }

  return (
    <Pagination className='text-base my-10'>
      <PaginationContent className='flex gap-1'>
        {/* Render 'Trang Đầu' link */}
        <Link
          href={`?page=1`}
          prefetch={false}
          className={cn(
            'cursor-pointer h-9 min-w-20 max-sm:min-w-14 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color',
            isFirstPage && 'opacity-50 hover:text-inherit pointer-events-none',
          )}
          onClick={() => handleClick(1)}
        >
          <ChevronLeft size={18} />
          Đầu
        </Link>

        {/* Render 'Trang Trước' link */}
        <div className='flex gap-1'>
          <Link
            href={`?page=${currentPage - 1}`}
            prefetch={false}
            className={cn(
              'cursor-pointer h-9 min-w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color',
              isFirstPage && 'opacity-50 hover:text-inherit pointer-events-none',
            )}
            onClick={() => handleClick(currentPage - 1)}
          >
            <ChevronLeft size={22} />
          </Link>

          {/* Render individual page links */}
          {pageToShow.map((page) => (
            <Link
              key={page}
              href={`?page=${page}`}
              prefetch={false}
              className={`bg-white bg-opacity-5 rounded-md h-9 min-w-10 flex items-center justify-center hover:text-primary-color ${currentPage === page && 'text-primary-color border border-yellow-400'}`}
              onClick={() => handleClick(page)}
            >
              {page}
            </Link>
          ))}

          {/* Render 'Trang Sau' link */}
          <Link
            href={`?page=${currentPage + 1}`}
            prefetch={false}
            className={cn(
              'cursor-pointer h-9 min-w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color',
              isLastPage && 'opacity-50 hover:text-inherit pointer-events-none',
            )}
            onClick={() => handleClick(currentPage + 1)}
          >
            <ChevronRight size={22} />
          </Link>
        </div>

        {/* Render 'Trang Cuối' link */}
        <Link
          href={`?page=${pagination.totalPages}`}
          prefetch={false}
          className={cn(
            'cursor-pointer h-9 min-w-20 max-sm:min-w-14 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color',
            isLastPage && 'opacity-50 hover:text-inherit pointer-events-none',
          )}
          onClick={() => handleClick(pagination.totalPages)}
        >
          Cuối
          <ChevronRight size={18} />
        </Link>
      </PaginationContent>
    </Pagination>
  )
})

PaginationCustom.displayName = 'PaginationCustom'

export default PaginationCustom
