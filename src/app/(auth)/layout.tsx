import Image from 'next/image'
import authBackground from '@/assets/images/background.png'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='relative w-full h-screen'>
        <Image
          fill
          src={authBackground}
          alt='Background'
          className='object-cover'
        />
      </div>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50'>
        <div className='py-12 px-16 min-w-[450px] flex flex-col gap-6 shadow-lg backdrop-brightness-110 bg-black/80'>
          {children}
        </div>
      </div>
    </>
  )
}
