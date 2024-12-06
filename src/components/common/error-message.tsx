import Link from 'next/link'

export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className='min-h-screen flex flex-col gap-2 items-center justify-center text-xl px-[25px]'>
      <p className='text-5xl font-bold text-secondary-color'>500 - Error</p>
      <p className='text-xl text-center opacity-80'>
        {message
          ? message
          : 'Oops! Something went wrong. Please reload the page or try again later.'}
      </p>
      <Link
        href='/'
        className='text-sm gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 py-2 px-4 rounded-full transition-all duration-300 mt-6'
      >
        Back To Home
      </Link>
    </div>
  )
}
