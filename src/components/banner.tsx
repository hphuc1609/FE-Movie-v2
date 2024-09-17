'use client'

import { MovieItem } from '@/models/interfaces/list-movie'
import { NewMovieItem } from '@/models/interfaces/new-movie'
import { useBanners } from '@/services/query-data'
import { CalendarDays, MoveLeft, MoveRight, Play } from 'lucide-react'
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

const Banner = () => {
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<SwiperRef>(null)
  const router = useRouter()

  const [activeSlide, setActiveSlide] = useState(0)
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  const { data: banners, isLoading: isLoadingBanners } = useBanners()

  const filteredNewMovies = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return (
      banners?.items?.filter(
        (movie) =>
          movie.year === currentYear && !movie.category.some((cat) => cat.slug === 'phim-18'),
      ) || []
    )
  }, [banners?.items])

  // ------------------- Event Handlers -----------------------------
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.realIndex)
  }

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  const handleButtonClick = (slug: string) => {
    router.push(`/phim/${slug}`)
  }

  const imageUrl = (item: MovieItem, imageIndex: number) => {
    const hasError = errorImage[imageIndex]
    return !hasError && banners?.APP_DOMAIN_CDN_IMAGE
      ? `${banners?.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`
      : `${banners?.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`
  }

  if (isLoadingBanners) {
    return <Skeleton className='w-full h-[650px] bg-black bg-opacity-30' />
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
      className='relative max-w-screen-2xl h-[610px] text-white'
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
            <div className='absolute top-0 w-full h-full bg-black bg-opacity-30' />
            <div className='absolute top-1/3 left-20 max-lg:left-[25px] max-md:right-[25px] md:w-[540px] flex flex-col gap-4'>
              <div
                className={`transition-all ${
                  index !== activeSlide ? 'opacity-0 translate-y-1/2' : 'opacity-100 translate-y-0'
                } grid gap-y-3`}
                style={{ transitionDuration: '2500ms', transitionDelay: '1000ms' }}
              >
                <p className='text-[42px] max-md:text-3xl font-bold line-clamp-2 leading-tight'>
                  {item.name}
                </p>
                <div className='text-base text-gray-50 font-medium flex items-center gap-3'>
                  <p className='line-clamp-1 text-xl'>{item.origin_name}</p>
                  <CalendarDays size={18} />
                  <span>{item.year}</span>
                </div>
              </div>
              <Button
                variant='outline'
                size='lg'
                className={`w-[170px] p-0 text-sm uppercase font-medium mt-8 hover:bg-[#242424] hover:bg-opacity-80 hover:text-secondary rounded-full bg-[#242424] border-2 border-yellow-400 transition-all ${
                  index !== activeSlide ? 'invisible opacity-0' : 'visible opacity-100'
                }`}
                style={{ transitionDuration: '2000ms', transitionDelay: '2500ms' }}
                onClick={() => handleButtonClick(item.slug)}
              >
                <Play
                  size={15}
                  fill='white'
                  className='mr-3'
                />
                Xem ngay
              </Button>
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
