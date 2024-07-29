'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLoading } from '../loading-provider'

export default function ErrorMessage({ message }: { message?: string }) {
  const loader = useLoading()

  return (
    <div className='min-h-screen flex flex-col gap-2 items-center justify-center text-xl'>
      <p className='text-9xl font-bold text-secondary-color'>500</p>
      <p className='text-xl'>Internal Server Error</p>
      <p className='text-base opacity-80'>
        {message ? message : 'Opps! Đã xảy ra lỗi vui lòng tải lại trang hoặc quay lại sau.'}
      </p>
      <Link
        href='/'
        className='text-sm flex items-center gap-2 mt-5 hover:bg-white hover:bg-opacity-10 py-2 px-3 rounded-full transition-all duration-300'
        onClick={() => loader.show()}
      >
        <ArrowLeft size={16} /> Quay lại trang chủ
      </Link>
    </div>
  )
}
