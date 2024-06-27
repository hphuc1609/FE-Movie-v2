import { MovieCategoryItem } from '@/models/list-movie'
import CardImage from '../card-image'

interface TablePaginationProps {
  category: string
  data: any
}

export default function TablePagination(props: TablePaginationProps) {
  const { category, data } = props

  return (
    <div className='flex flex-col gap-9'>
      <div className='grid grid-cols-5 gap-6 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-5 overflow-hidden'>
        <CardImage
          data={data}
          paramCategory={category}
          itemLength={data?.items?.length}
        />
      </div>
    </div>
  )
}
