'use client'

import { MovieCategoryItem } from '@/models/list-movie'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import CardImage from '../common/card-image'
import { useLoading } from '../loading-provider'
import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import useFetchData from '@/hooks/use-fetch'
import { Skeleton } from '../ui/skeleton'

interface CategoryMovieProps {
  paramCategory: string
  title?: string
}

export default function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory, title } = props
  const loader = useLoading()

  // -------------------- Fetch data -----------------------------
  const fetchDataByCate = async () => {
    try {
      const res = await movieApi.getList({ category: paramCategory })
      if (!isSuccessResponse(res)) return null
      return res.data
    } catch (error: any) {
      console.error('Error fetching data: ', error.message)
      return null
    }
  }

  const { data: dataMovie, isLoading } = useFetchData({
    queryKey: ['dataMovie', paramCategory],
    queryFn: fetchDataByCate,
    enabled: !!paramCategory,
  })

  const isPhimLeOrPhimBo = ['phim lẻ', 'phim bộ'].includes(title?.toLowerCase() || '')

  // -------------------- Render UI -----------------------------
  return (
    <section className='flex-1 flex flex-col gap-9'>
      <header className='flex items-center justify-between'>
        <h2 className={`text-3xl max-md:text-xl font-semibold uppercase text-secondary-color`}>
          {title}
          {isPhimLeOrPhimBo && <span className='text-white'> mới cập nhật</span>}
        </h2>
        {!isLoading && paramCategory && (
          <Link
            href={`/danh-sach/${paramCategory}?page=1`}
            className='text-sm text-white text-opacity-80 hover:text-primary-color text-nowrap flex items-center space-x-1'
            onClick={() => loader.show()}
            aria-label={`Xem thêm các ${dataMovie?.titlePage}`}
          >
            Xem thêm
            <ChevronRight size={16} />
          </Link>
        )}
      </header>
      <div className='grid grid-cols-4 max-md:grid-cols-2 gap-[20px] gap-y-7 max-lg:gap-x-4 max-md:gap-x-6'>
        {isLoading ? (
          <SkeletonCard />
        ) : (
          <CardImage
            data={dataMovie as MovieCategoryItem}
            paramCategory={paramCategory}
            itemLength={dataMovie?.items?.length}
          />
        )}
      </div>
    </section>
  )
}

const SkeletonCard = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col gap-3'
        >
          <Skeleton className='w-full h-[270px] max-[400px]:h-[220px] bg-skeleton rounded-md' />
          <Skeleton className='w-full h-[15px] bg-skeleton' />
          <Skeleton className='w-1/2 h-[15px] bg-skeleton' />
        </div>
      ))}
    </>
  )
}
