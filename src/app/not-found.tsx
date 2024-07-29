'use client'

import { useLoading } from '@/components/loading-provider'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  const loader = useLoading()
  return (
    <div className='flex max-lg:flex-col gap-8 items-center min-h-screen w-fit m-auto text-white'>
      <div className='relative flex-1'>
        <Image
          src={'/images/astronaut.png'}
          alt='Astronaut'
          width={180}
          height={180}
          loading='lazy'
          className='absolute top-1/2 translate-y-[-50%] left-1/2 transform translate-x-[-50%] z-50'
        />
        <Image
          src={'/images/ellipse.png'}
          alt='Ellipse'
          width={500}
          height={500}
          loading='lazy'
        />
      </div>
      <div className='flex flex-col flex-1 items-center gap-4'>
        <h2 className='text-6xl max-sm:text-3xl font-bold lett tracking-widest'>404 - Error</h2>
        <p className='text-2xl uppercase font-semibold tracking-wide'>Page Not Found</p>
        <p className='text-base text-center text-white text-opacity-60'>
          Sorry, the page you are looking for cannot be found.
        </p>
        <Link
          href='/'
          className='text-sm w-fit flex items-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 py-2 px-4 rounded-full transition-all duration-300'
          onClick={() => loader.show()}
        >
          Back To Home
        </Link>
      </div>
    </div>
  )
}
