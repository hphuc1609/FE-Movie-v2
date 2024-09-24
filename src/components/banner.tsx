'use client'

import { MovieItem } from '@/models/interfaces/list-movie'
import { useBanners } from '@/services/query-data'
import { CalendarDays, Clock4, MoveLeft, MoveRight, Play } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../css/banner.css'
import { cn } from '@/lib/utils'

const Banner = () => {
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<SwiperRef>(null)
  const router = useRouter()

  const [activeSlide, setActiveSlide] = useState(0)
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const { data: banners, isLoading: isLoadingBanners } = useBanners({
    category: 'phim-le',
    limit: 64,
  })

  const filteredNewMovies = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const yearsToCheck = Array.from({ length: currentYear + 1 }, (_, i) => currentYear - i)

    return yearsToCheck.reduce((movies, year) => {
      if (movies.length === 0) {
        return (
          banners?.items.filter(
            (movie) => movie.year === year && !movie.category.some((cat) => cat.slug === 'phim-18'),
          ) || []
        )
      }
      return movies
    }, [] as MovieItem[])
  }, [banners?.items])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.realIndex)
  }

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  const imageUrl = (item: MovieItem, imageIndex: number) => {
    const hasError = errorImage[imageIndex]
    return !hasError && banners?.APP_DOMAIN_CDN_IMAGE
      ? `${banners?.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`
      : `${banners?.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`
  }

  if (isLoadingBanners) {
    return <Skeleton className='w-full h-[650px] max-sm:h-[350px] bg-neutral-400/15' />
  }

  return (
    <Swiper
      ref={swiperRef}
      onSlideChange={handleSlideChange}
      onNavigationNext={() => nextBtnRef.current?.click()}
      onNavigationPrev={() => prevBtnRef.current?.click()}
      pagination={{ clickable: true }}
      slidesPerView={1}
      effect='fade'
      fadeEffect={{ crossFade: true }}
      loop={filteredNewMovies.length > 1}
      speed={1500}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay, EffectFade]}
      className='relative max-w-screen-2xl h-[610px] max-sm:h-[550px]'
    >
      {filteredNewMovies.slice(0, 5).map((item, index) => {
        return (
          <SwiperSlide key={item._id}>
            <Image
              src={imageUrl(item, index)}
              alt={item.origin_name}
              quality={100}
              priority
              fill
              onError={() => handleErrorImage(index)}
              className='w-full h-full object-cover'
            />
            <div className='absolute top-0 w-full h-full bg-black/55' />
            <div className='absolute top-1/2 -translate-y-1/2 left-20 max-lg:left-[25px] max-md:right-[25px] md:max-w-[650px] flex flex-col gap-4'>
              <div
                className={cn('transition-all opacity-100 grid gap-y-7 max-sm:gap-y-4', {
                  'opacity-0 ': index !== activeSlide,
                })}
              >
                <div>
                  <p className='text-[42px] font-bold line-clamp-2 leading-tight max-md:text-2xl'>
                    {item.name}
                  </p>
                  <p className='line-clamp-1 text-lg md:text-2xl'>{item.origin_name}</p>
                </div>
                <div className='text-base max-sm:text-sm text-gray-50 flex items-center gap-5'>
                  <span className='border-2 border-white font-semibold px-1.5'>{item.quality}</span>
                  <span className='line-clamp-1 w-1/2'>
                    {item.category.map((cat) => cat.name).join(', ')}
                  </span>
                  <span className='flex items-center gap-2 text-nowrap'>
                    <Clock4
                      size={17}
                      color='yellow'
                    />
                    {item.time}
                  </span>
                  <span className='flex items-center gap-2'>
                    <CalendarDays
                      size={17}
                      color='yellow'
                    />
                    {item.year}
                  </span>
                </div>
                <Button
                  variant='default'
                  className={cn(
                    'w-[170px] h-14 max-sm:h-10 max-sm:w-[120px] p-0 text-sm max-sm:text-xs font-semibold uppercase rounded-full bg-transparent border-2 border-yellow-400 transition-all max-sm:px-4 visible opacity-100',
                    { 'invisible opacity-0': index !== activeSlide },
                    'hover:bg-yellow-400 hover:text-black hover:fill-current',
                  )}
                  onClick={() => router.push(`/phim/${item.slug}?episode=full`)}
                >
                  <Play
                    size={16}
                    fill='currentColor'
                    className='mr-3 max-sm:mr-2'
                  />
                  Xem ngay
                </Button>
              </div>
            </div>
          </SwiperSlide>
        )
      })}

      {filteredNewMovies.length > 0 && (
        <div className='absolute z-50 bottom-3 right-20 flex items-center gap-3'>
          <Button
            ref={prevBtnRef}
            size={'icon'}
            variant={'outline'}
            className='max-md:hidden w-10 h-10 bg-transparent text-primary-foreground hover:text-primary-foreground rounded-full hover:bg-white hover:bg-opacity-30'
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <MoveLeft />
          </Button>
          <Button
            ref={nextBtnRef}
            size={'icon'}
            variant={'outline'}
            className='max-md:hidden w-10 h-10 bg-transparent text-primary-foreground hover:text-primary-foreground rounded-full hover:bg-white hover:bg-opacity-30'
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <MoveRight />
          </Button>
        </div>
      )}
    </Swiper>
  )
}

export default Banner
