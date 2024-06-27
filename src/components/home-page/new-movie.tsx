import { NewMovieResponse } from '@/models/new-movie'
import { CirclePlay, MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface NewUpdateMovieProps {
  dataNew: NewMovieResponse['items']
}

export default function NewUpdateMovie({ dataNew }: NewUpdateMovieProps) {
  return (
    <div className='max-lg:hidden flex flex-col gap-5 flex-1'>
      {/* Heading */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold uppercase text-primary-color'>
          Phim mới
          <span className='ml-1 text-primary-foreground'>cập nhật</span>
        </h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <Link
            href={`/danh-sach/phim-moi`}
            className='text-xs font-medium uppercase'
          >
            Tất cả
          </Link>
          <MoveRight size={20} />
        </div>
      </div>
      {/* List */}
      <div
        className='rounded-sm bg-black bg-opacity-30 overflow-auto p-5 flex flex-col gap-3 
        scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent'
      >
        {dataNew.slice(0, 10).map((item) => (
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
              <div className='flex flex-col gap-2 group'>
                <span className='text-sm group-hover:text-primary-color line-clamp-2 font-medium'>
                  {item.name}
                </span>
                <span className='text-xs opacity-60 line-clamp-1'>{item.origin_name}</span>
                <span className='text-xs opacity-60'>{item.year}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
