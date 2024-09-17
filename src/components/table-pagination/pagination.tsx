import { Pagination, PaginationContent, PaginationEllipsis } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { MoviePagination } from '@/models/interfaces/list-movie'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface PaginationProps {
  pagesToShow: MoviePagination['totalPages'][]
  dataPagination: MoviePagination
}

const PaginationCustom = (props: PaginationProps) => {
  const { pagesToShow, dataPagination } = props

  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === dataPagination.totalPages

  return (
    <Pagination className='text-base'>
      <PaginationContent>
        <div className='flex gap-1'>
          <Link
            href={`?page=${currentPage - 1}`}
            className={cn(
              'cursor-pointer h-9 min-w-10 px-2 flex items-center justify-center bg-white bg-opacity-5 hover:text-primary-color !hover:bg-transparent',
              isFirstPage && 'opacity-50 hover:text-inherit pointer-events-none',
            )}
            title='Trang trước'
          >
            <ChevronLeft size={20} />
          </Link>

          {pagesToShow.map((page, index) => (
            <React.Fragment key={page}>
              {index === 1 && pagesToShow[1] > 2 && <PaginationEllipsis />}
              <Link
                href={`?page=${page}`}
                className={cn(
                  'bg-white bg-opacity-5 h-9 min-w-10 flex items-center justify-center hover:text-primary-color',
                  currentPage === page && 'text-primary-color border border-yellow-400',
                )}
              >
                {page}
              </Link>
              {index === pagesToShow.length - 2 && page < dataPagination.totalPages - 1 && (
                <PaginationEllipsis />
              )}
            </React.Fragment>
          ))}

          <Link
            href={`?page=${currentPage + 1}`}
            className={cn(
              'cursor-pointer h-9 min-w-10 px-2 flex items-center justify-center bg-white bg-opacity-5 hover:text-primary-color',
              isLastPage && 'opacity-50 hover:text-inherit pointer-events-none',
            )}
            title='Trang sau'
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom
