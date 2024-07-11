import { Pagination, PaginationContent, PaginationEllipsis } from '@/components/ui/pagination'
import { MoviePagination } from '@/models/list-movie'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
  pageToShow: MoviePagination['totalPages'][]
  pagination: MoviePagination
  category: string
  currentPage: number
}

const PaginationCustom: React.FC<PaginationProps> = ({
  pageToShow,
  pagination,
  category,
  currentPage,
}) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pagination.totalPages

  return (
    <Pagination className='text-base'>
      <PaginationContent className='flex max-sm:flex-col gap-1'>
        {/* Render 'Trang Đầu' link */}
        {!isFirstPage && (
          <Link
            className={`cursor-pointer h-9 px-3 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === 1 && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            href={`/danh-sach/${category}?page=1`}
          >
            <ChevronLeft size={18} />
            Đầu
          </Link>
        )}

        {/* Render 'Trang Trước' link */}
        <div className='flex gap-1'>
          {!isFirstPage && (
            <Link
              className={`cursor-pointer h-9 min-w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === 1 && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
              href={currentPage > 1 ? `/danh-sach/${category}?page=${currentPage - 1}` : ''}
            >
              <ChevronLeft size={22} />
            </Link>
          )}

          {currentPage > 2 && <PaginationEllipsis />}
          {/* Render individual page links */}
          {pageToShow.map((page) => (
            <Link
              key={page}
              href={`/danh-sach/${category}?page=${page}`}
              className={`bg-white bg-opacity-5 rounded-md h-9 min-w-10 flex items-center justify-center hover:text-primary-color ${currentPage === page && 'text-primary-color border border-yellow-400'}`}
            >
              {page}
            </Link>
          ))}

          {currentPage < pagination.totalPages - 1 && <PaginationEllipsis />}
          {/* Render 'Trang Sau' link */}
          {!isLastPage && (
            <Link
              className={`cursor-pointer h-9 min-w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === pagination.totalPages && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
              href={`/danh-sach/${category}?page=${currentPage + 1}`}
            >
              <ChevronRight size={22} />
            </Link>
          )}
        </div>

        {/* Render 'Trang Cuối' link */}
        {!isLastPage && (
          <Link
            className={`cursor-pointer h-9 px-3 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === pagination.totalPages && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            href={`/danh-sach/${category}?page=${pagination.totalPages}`}
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
