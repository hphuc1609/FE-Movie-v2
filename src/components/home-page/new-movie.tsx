'use client'

import { NewMovieItem } from '@/models/new-movie'
import { CirclePlay } from 'lucide-react'
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
    <div className={`${!isDetailPage && 'max-lg:hidden'} flex flex-col gap-5 flex-auto`}>
      {/* Heading */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-medium uppercase text-primary-color line-clamp-1'>
          Phim mới
          <span className='ml-1 text-primary-foreground'>nổi bật</span>
        </h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <Link
            href={`/danh-sach/phim-moi`}
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
            className='flex gap-5'
          >
            <div className='relative group w-[75px] h-[87px] bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'>
              <div className='w-full group-hover:scale-110 transition-all duration-500'>
                <Image
                  src={`${item.poster_url}`}
                  alt={item.name}
                  width={478}
                  height={190}
                  priority
                  className='w-full h-full object-cover'
                />
              </div>
              <Link
                href={`/phim/${item.slug}`}
                className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 cursor-pointer transition-all duration-300 group-hover:bg-opacity-50'
              >
                <CirclePlay
                  size={20}
                  strokeWidth={1}
                  className='m-auto h-full opacity-0 group-hover:opacity-100'
                />
              </Link>
            </div>
            <Link
              href={`/phim/${item.slug}`}
              className='flex-1'
            >
              <div className='flex flex-col gap-1 group'>
                <span className='text-sm group-hover:text-primary-color line-clamp-2 font-medium'>
                  {item.name}
                </span>
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
