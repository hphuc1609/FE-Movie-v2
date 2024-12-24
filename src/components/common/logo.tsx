import Link from 'next/link'

const MyLogo = () => {
  return (
    <Link
      href='/'
      className='relative flex items-baseline gap-2 text-2xl text-nowrap font-normal justify-center md:justify-start'
      style={{ fontFamily: 'Vampiro One, system-ui' }}
    >
      <span className='text-primary-color'>Mephim</span>
      <span className='text-xl'>247</span>
    </Link>
  )
}

export default MyLogo
