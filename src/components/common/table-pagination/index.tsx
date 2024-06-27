import Link from 'next/link'
import CardImage from '../card-image'

interface TablePaginationProps {
  category: string
  data: any
  keyword?: string
}

export default function TablePagination(props: TablePaginationProps) {
  const { category, data } = props

  return (
    <>
      {data.items?.length > 0 ? (
        <div className='flex flex-col gap-9'>
          <div className='grid grid-cols-5 gap-6 max-sm:grid-cols-2 max-md:grid-cols-3 max-xl:grid-cols-4 overflow-hidden'>
            <CardImage
              data={data}
              paramCategory={category}
              itemLength={data.items.length}
            />
          </div>
        </div>
      ) : (
        <>
          <p className='text-center text-3xl'>
            <span className='text-primary-color'>Không thấy kết quả tìm kiếm: </span>
            {props.keyword}
          </p>
          <Link
            href={'/'}
            className='text-center text-lg underline text-primary-color'
          >
            Quay lại trang chủ
          </Link>
        </>
      )}
    </>
  )
}
