import { useLoading } from '@/components/loading-provider'
import { Pagination, PaginationContent, PaginationEllipsis } from '@/components/ui/pagination'
import { MoviePagination } from '@/models/list-movie'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
  pageToShow: MoviePagination['totalPages'][]
  pagination: MoviePagination
  currentPage: number
}

const PaginationCustom: React.FC<PaginationProps> = ({ pageToShow, pagination, currentPage }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pagination.totalPages
  const loader = useLoading()

  return (
    <Pagination className='text-base'>
      <PaginationContent className='flex max-sm:flex-col gap-1'>
        {/* Render 'Trang Đầu' link */}
        {!isFirstPage && (
          <Link
            href={`?page=1`}
            className={`cursor-pointer h-9 px-3 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === 1 && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            onClick={() => loader.show()}
          >
            <ChevronLeft size={18} />
            Đầu
          </Link>
        )}

        {/* Render 'Trang Trước' link */}
        <div className='flex gap-1'>
          {!isFirstPage && (
            <Link
              href={currentPage > 1 ? `?page=${currentPage - 1}` : ''}
              className={`cursor-pointer h-9 min-w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === 1 && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
              onClick={() => loader.show()}
            >
              <ChevronLeft size={22} />
            </Link>
          )}

          {currentPage > 2 && <PaginationEllipsis />}
          {/* Render individual page links */}
          {pageToShow.map((page) => (
            <Link
              key={page}
              href={`?page=${page}`}
              className={`bg-white bg-opacity-5 rounded-md h-9 min-w-10 flex items-center justify-center hover:text-primary-color ${currentPage === page && 'text-primary-color border border-yellow-400'}`}
              onClick={() => loader.show()}
            >
              {page}
            </Link>
          ))}

          {currentPage < pagination.totalPages - 1 && <PaginationEllipsis />}
          {/* Render 'Trang Sau' link */}
          {!isLastPage && (
            <Link
              href={`?page=${currentPage + 1}`}
              className={`cursor-pointer h-9 min-w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === pagination.totalPages && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
              onClick={() => loader.show()}
            >
              <ChevronRight size={22} />
            </Link>
          )}
        </div>

        {/* Render 'Trang Cuối' link */}
        {!isLastPage && (
          <Link
            href={`?page=${pagination.totalPages}`}
            className={`cursor-pointer h-9 px-3 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === pagination.totalPages && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            onClick={() => loader.show()}
          >
            Cuối
            <ChevronRight size={18} />
          </Link>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom
