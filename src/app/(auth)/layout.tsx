import Image from 'next/image'
import authBackground from '@/assets/images/background.png'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='w-full min-h-full max-xl:min-h-screen xl:min-h-screen relative px-4 py-10 sm:p-20 flex items-center justify-center'>
      <Image
        fill
        src={authBackground}
        alt='Background'
        priority
        className='object-cover h-full'
      />
      <div className='absolute top-0 left-0 w-full min-h-full xl:h-screen bg-black/50'></div>
      <div className='py-12 px-16 max-sm:p-10 max-w-[450px] w-full h-fit flex flex-col gap-6 shadow-lg backdrop-brightness-110 bg-black/75 z-50'>
        {children}
      </div>
    </div>
  )
}
