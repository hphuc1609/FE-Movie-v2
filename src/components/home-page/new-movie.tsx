import { NewMovieResponse } from '@/models/new-movie'
import { CirclePlay, MoveRight } from 'lucide-react'
import Image from 'next/image'

interface NewUpdateMovieProps {
  dataNew: NewMovieResponse['items']
}

export default function NewUpdateMovie({ dataNew }: NewUpdateMovieProps) {
  return (
    <div className='max-md:hidden flex flex-col gap-5 flex-1'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold uppercase text-primary-color'>Phim mới cập nhật</h2>
        <div className='flex items-center gap-4 cursor-pointer'>
          <p className='text-xs font-medium uppercase'>Tất cả</p>
          <MoveRight size={20} />
        </div>
      </div>

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
              <a
                href={`/phim/${item.slug}`}
                className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 cursor-pointer transition-all duration-300 group-hover:bg-opacity-50'
              >
                <CirclePlay
                  size={20}
                  strokeWidth={1}
                  className='m-auto h-full opacity-0 group-hover:opacity-100'
                />
              </a>
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <a
                href={`/phim/${item.slug}`}
                className='text-sm hover:text-primary-color'
              >
                {item.name}
              </a>
              <span className='text-xs opacity-70'>{item.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
