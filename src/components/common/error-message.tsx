import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className='min-h-screen flex flex-col gap-2 items-center justify-center text-xl px-[25px]'>
      <p className='text-9xl font-bold text-secondary-color'>500</p>
      <p className='text-xl'>Internal Server Error</p>
      <p className='text-lg text-center opacity-80'>
        {message
          ? message
          : 'Oops! Something went wrong. Please reload the page or try again later.'}
      </p>
      <Link
        href='/'
        className='text-sm flex items-center gap-2 mt-5 hover:bg-white hover:bg-opacity-10 py-2 px-3 rounded-full transition-all duration-300'
      >
        <ArrowLeft size={16} /> Back To Home
      </Link>
    </div>
  )
}
