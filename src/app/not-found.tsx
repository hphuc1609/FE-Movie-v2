import Image_1 from '@/assets/images/astronaut.png'
import Image_2 from '@/assets/images/ellipse.png'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex max-lg:flex-col gap-8 items-center min-h-screen w-fit m-auto text-white'>
      <div className='relative'>
        <Image
          src={Image_1}
          alt='Astronaut'
          width={180}
          height={180}
          loading='lazy'
          className='max-lg:hidden absolute top-1/2 translate-y-[-50%] left-1/2 transform translate-x-[-50%] z-10'
        />
        <Image
          src={Image_2}
          alt='Ellipse'
          width={500}
          height={500}
          loading='lazy'
          className='max-lg:hidden'
        />
      </div>
      <div className='flex flex-col flex-1 items-center justify-center gap-4'>
        <h2 className='text-6xl max-sm:text-5xl font-bold lett tracking-widest'>404 - Error</h2>
        <p className='text-2xl uppercase font-semibold tracking-wide'>Page Not Found</p>
        <p className='text-base max-sm:text-sm text-center text-white text-opacity-60'>
          Sorry, the page you are looking for cannot be found.
        </p>
        <Link
          href='/'
          className='text-sm w-fit flex items-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 py-2 px-4 rounded-full transition-all duration-300'
        >
          Back To Home
        </Link>
      </div>
    </div>
  )
}
