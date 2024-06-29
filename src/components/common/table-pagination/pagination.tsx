import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
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
      <PaginationContent className='flex gap-1'>
        {/* Render 'Trang Đầu' link */}
        {!isFirstPage && (
          <Link href={`/danh-sach/${category}?page=1`}>
            <PaginationItem
              className={`cursor-pointer h-9 px-3 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === 1 && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            >
              <ChevronLeft size={18} />
              Đầu
            </PaginationItem>
          </Link>
        )}

        {/* Render 'Trang Trước' link */}
        {!isFirstPage && (
          <Link href={currentPage > 1 ? `/danh-sach/${category}?page=${currentPage - 1}` : ''}>
            <PaginationItem
              className={`cursor-pointer h-9 w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === 1 && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            >
              <ChevronLeft size={22} />
            </PaginationItem>
          </Link>
        )}

        {/* Render ellipsis if necessary */}
        {currentPage > 2 && <PaginationEllipsis />}

        {/* Render individual page links */}
        {pageToShow.map((page) => (
          <Link
            key={page}
            href={`/danh-sach/${category}?page=${page}`}
          >
            <PaginationItem
              className={`bg-white bg-opacity-5 rounded-md h-9 w-10 flex items-center justify-center hover:text-primary-color ${currentPage === page && 'text-primary-color border border-yellow-400'}`}
            >
              {page}
            </PaginationItem>
          </Link>
        ))}

        {/* Render ellipsis if necessary */}
        {currentPage < pagination.totalPages - 1 && <PaginationEllipsis />}

        {/* Render 'Trang Sau' link */}
        {!isLastPage && (
          <Link href={`/danh-sach/${category}?page=${currentPage + 1}`}>
            <PaginationItem
              className={`cursor-pointer h-9 w-10 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === pagination.totalPages && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            >
              <ChevronRight size={22} />
            </PaginationItem>
          </Link>
        )}

        {/* Render 'Trang Cuối' link */}
        {!isLastPage && (
          <Link href={`/danh-sach/${category}?page=${pagination.totalPages}`}>
            <PaginationItem
              className={`cursor-pointer h-9 px-3 flex items-center justify-center bg-white bg-opacity-5 rounded-md hover:text-primary-color ${currentPage === pagination.totalPages && 'opacity-50 hover:text-inherit cursor-not-allowed'}`}
            >
              Cuối
              <ChevronRight size={18} />
            </PaginationItem>
          </Link>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom
