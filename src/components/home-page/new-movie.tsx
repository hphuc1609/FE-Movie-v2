'use client'

import { NewMovieItem } from '@/models/new-movie'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'

interface NewUpdateMovieProps {
  data: NewMovieItem[]
}

export default function NewUpdateMovie({ data }: NewUpdateMovieProps) {
  const pathname = usePathname()
  const isDetailPage = pathname.includes('phim')
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  return (
    <div
      className={`${!isDetailPage && 'max-lg:hidden'} flex flex-col gap-3 max-w-[360px] max-sm:max-w-full max-xl:max-w-[289px]`}
    >
      {/* Heading */}
      <div className='flex items-center justify-between'>
        <h2 className='text-base uppercase line-clamp-1'>Phim mới cập nhật</h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <Link
            href={`/danh-sach/phim-moi?page=1`}
            className='text-xs font-medium uppercase hover:text-primary-color text-nowrap'
          >
            Xem thêm
          </Link>
        </div>
      </div>
      {/* List */}
      <div
        className={`${isMobile && 'max-h-[450px]'} rounded-sm bg-black bg-opacity-30 overflow-auto p-3 flex flex-col gap-3 
        scrollbar-thin scrollbar-thumb-zinc-950 scrollbar-track-transparent`}
      >
        {data.slice(0, 10).map((item) => (
          <div
            key={item._id}
            className='h-[90px] max-md:min-h-[90px] overflow-hidden'
          >
            <Link
              href={`/phim/${item.slug}`}
              className='w-full h-full flex gap-2 bg-black bg-opacity-0 hover:bg-opacity-50'
            >
              <div className='relative w-[80px] h-full bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'>
                <div className='w-full transition-all duration-500'>
                  <Image
                    src={`${item.poster_url}`}
                    alt={item.name}
                    width={478}
                    height={190}
                    priority
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-1 flex-1 py-2'>
                <span className='text-xs line-clamp-1 font-semibold opacity-80'>{item.name}</span>
                <span className='text-xs opacity-30 line-clamp-1'>{item.origin_name}</span>
                <span className='text-xs opacity-30'>{item.year}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
