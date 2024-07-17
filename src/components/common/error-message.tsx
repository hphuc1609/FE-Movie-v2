import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ErrorMessage() {
  return (
    <div className='min-h-screen flex flex-col gap-2 items-center justify-center text-xl'>
      <p className='text-9xl max-lg:text-3xl font-bold text-secondary-color'>500</p>
      <p className='text-xl'>Internal Server Error</p>
      <p className='text-base opacity-80'>
        Opps! Đã xảy ra lỗi vui lòng tải lại trang hoặc quay lại sau.
      </p>
      <Link
        href='/'
        className='text-sm flex items-center gap-2 mt-6'
      >
        <ArrowLeft size={16} /> Quay lại trang chủ
      </Link>
    </div>
  )
}
