import movieApi from '@/api-client/movies'
import Link from 'next/link'
import CardImage from '../common/card-image'

interface CategoryMovieProps {
  paramCategory: string
}

export default async function CategoryMovie(props: CategoryMovieProps) {
  const { paramCategory } = props
  const response = await movieApi.getList({ category: paramCategory })
  const dataMovie = response.data

  return (
    <div className='flex-1 flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold uppercase text-primary-color'>
          {dataMovie.titlePage}
        </h2>
        <Link
          href={`/danh-sach/${paramCategory}?page=1`}
          className='text-xs font-medium uppercase hover:text-primary-color text-nowrap'
        >
          Xem thêm
        </Link>
      </div>
      <div className='grid grid-cols-4 max-md:grid-cols-2 gap-[20px] max-lg:gap-x-4 max-md:gap-x-6'>
        <CardImage
          data={dataMovie}
          paramCategory={paramCategory}
          itemLength={dataMovie.items?.length}
        />
      </div>
    </div>
  )
}
