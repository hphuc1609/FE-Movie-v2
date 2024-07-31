'use client'

import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import useFetchData from '@/hooks/use-fetch'
import { MovieItem } from '@/models/list-movie'
import { NewMovieItem } from '@/models/new-movie'
import { CalendarDays, MoveLeft, MoveRight, Play } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { useLoading } from './loading-provider'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../css/banner.css'

export default function Banner() {
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<SwiperRef>(null)
  const router = useRouter()
  const loader = useLoading()

  const [activeSlide, setActiveSlide] = useState(0)
  const [errorImage, setErrorImage] = useState<{ [key: number]: boolean }>({})

  // ------------------- Fetch Data -----------------------------
  const fetchData = async () => {
    try {
      const dataPhimLe = await movieApi.getList({ category: 'phim-le' })
      const dataPhimBo = await movieApi.getList({ category: 'phim-bo' })

      if (!isSuccessResponse(dataPhimLe) || !isSuccessResponse(dataPhimBo)) return null
      const dataBanner = {
        domainImage: dataPhimLe.data.APP_DOMAIN_CDN_IMAGE || dataPhimBo.data.APP_DOMAIN_CDN_IMAGE,
        items: [...dataPhimLe.data.items, ...dataPhimBo.data.items],
      }

      return dataBanner
    } catch (error: any) {
      console.error('Error fetching data banner: ', error.message)
      return null
    }
  }

  const { data: dataBanner, isLoading: isLoadingBanner } = useFetchData({
    queryKey: ['dataBanner'],
    queryFn: fetchData,
  })

  // Filter data by current year
  const currentYear = new Date().getFullYear()
  const filteredData = useMemo(() => {
    const currentYearData = dataBanner?.items
      .filter((item) => item.year === currentYear)
      .slice(0, 7)
    return currentYearData || []
  }, [dataBanner?.items, currentYear])

  // ------------------- Event Handlers -----------------------------
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.realIndex)
  }

  const handleErrorImage = (index: number) => {
    setErrorImage((prev) => ({ ...prev, [index]: true }))
  }

  const handleButtonClick = (slug: string) => {
    loader.show()
    router.push(`/phim/${slug}`)
  }

  // ------------------ Image Url ----------------------------------
  const imageUrl = (item: MovieItem, index: number) => {
    const hasError = errorImage[index]
    return !hasError && dataBanner?.domainImage
      ? `${dataBanner.domainImage}/${item.thumb_url}`
      : `${item.thumb_url}`
  }

  // ------------------ Render UI ----------------------------------
  if (isLoadingBanner) return <Skeleton className='w-full h-[650px] bg-black bg-opacity-30' />

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
      loop={filteredData.length > 1}
      speed={1500}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay, EffectFade]}
      className='relative max-w-screen-2xl h-[650px] text-white'
    >
      {filteredData.map((item, index) => {
        return (
          <SwiperSlide key={item._id}>
            <Image
              src={imageUrl(item, index)}
              alt={item.origin_name}
              width={1530}
              height={500}
              quality={100}
              priority
              onError={() => handleErrorImage(index)}
              className='w-full h-full object-cover object-top'
            />
            <div className='absolute top-0 w-full h-full bg-black bg-opacity-30' />
            <div className='absolute top-1/3 left-20 max-lg:left-[25px] max-md:right-[25px] md:w-[540px] flex flex-col gap-4'>
              <div
                className={`transition-all ${
                  index !== activeSlide ? 'opacity-0 translate-y-1/2' : 'opacity-100 translate-y-0'
                } grid gap-y-3`}
                style={{ transitionDuration: '2500ms', transitionDelay: '1000ms' }}
              >
                <h1 className='text-[42px] max-md:text-3xl font-bold line-clamp-2 leading-tight'>
                  {item.name}
                </h1>
                <SubtextBanner movieItem={item} />
              </div>
              <Button
                variant='outline'
                size='lg'
                className={`w-[170px] p-0 text-sm uppercase font-medium mt-8 hover:bg-[#242424] hover:bg-opacity-80 hover:text-secondary rounded-full bg-[#242424] border-2 border-yellow-400 transition-all ${
                  index !== activeSlide ? 'invisible opacity-0' : 'visible opacity-100'
                }`}
                style={{ transitionDuration: '2000ms', transitionDelay: '3000ms' }}
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
      {filteredData.length > 0 && (
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

const SubtextBanner = ({ movieItem }: { movieItem: NewMovieItem }) => {
  const { origin_name, year } = movieItem
  return (
    <div className='flex flex-col text-sm gap-5'>
      <div className='text-gray-50 font-medium flex items-center gap-3'>
        <h3 className='line-clamp-1 text-lg'>{origin_name}</h3>
        <CalendarDays
          size={20}
          className='text-primary-color'
        />
        {year}
      </div>
    </div>
  )
}
