import { cn } from '@/lib/utils'
import { Vampiro_One } from 'next/font/google'
import Link from 'next/link'

const vampiro = Vampiro_One({ subsets: ['latin'], weight: '400' })

const MyLogo = () => {
  return (
    <Link
      href='/'
      className={cn(
        'relative flex items-baseline gap-2 text-2xl text-nowrap justify-center md:justify-start',
        vampiro.className,
      )}
    >
      <span className='text-primary-color'>Mephim</span>
      <span className='text-xl'>247</span>
    </Link>
  )
}

export default MyLogo
