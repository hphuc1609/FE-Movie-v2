import { MovieCategoryItem } from '@/models/list-movie'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import CardImage from '../card-image'
import PaginationCustom from './pagination'
import { useLoading } from '@/components/loading-provider'

interface TablePaginationProps {
  category: string
  data: MovieCategoryItem
  keyword?: string
}

export default function TablePagination(props: TablePaginationProps) {
  const { category, data, keyword } = props
  const searchParams = useSearchParams()
  const { isLoading } = useLoading()
  const currentPage = searchParams.get('page')
  const pagination = data.params?.pagination || data?.pagination

  // Memoize the list of pages to prevent unnecessary re-renders
  const pagesToShow = useMemo(() => {
    if (!pagination) return []

    const totalPages = pagination.totalPages
    let startPage = Math.max(1, Number(currentPage) - 1)
    let endPage = Math.min(totalPages, startPage + 3) // Show 4 pages in total

    if (endPage - startPage < 3) {
      startPage = Math.max(1, endPage - 3) // Ensure we show 4 pages
    }

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }, [currentPage, pagination])

  return (
    <>
      <div className='flex flex-col gap-10 pb-9'>
        {data.items?.length > 0 ? (
          <div className='grid grid-cols-6 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-5 gap-5 gap-y-7 overflow-hidden'>
            <CardImage
              data={data}
              paramCategory={category}
              itemLength={pagination?.totalItemsPerPage}
            />
          </div>
        ) : (
          <p className='text-2xl font-medium'>
            {!isLoading ? !keyword && 'Không có danh sách phim' : 'Đang tải danh sách...'}
          </p>
        )}
        {!isLoading && pagesToShow?.length > 1 && (
          <PaginationCustom
            pageToShow={pagesToShow}
            currentPage={Number(currentPage)}
            pagination={pagination}
          />
        )}
      </div>
      {keyword && !isLoading && data.items?.length === 0 && (
        <div className='flex flex-col items-center gap-2'>
          <p className='text-3xl font-medium'>
            <span className='text-primary-color'>Không tìm thấy phim: </span>
            {keyword}
          </p>
          <Link
            href={'/'}
            className='text-lg flex gap-2 items-center text-primary-color'
          >
            <ArrowLeft size={16} /> Quay lại trang chủ
          </Link>
        </div>
      )}
    </>
  )
}
