'use client'

import { NewMovieItem } from '@/models/new-movie'
import { CalendarDays, MoveLeft, MoveRight, Play } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { Button } from './ui/button'

import 'swiper/css'
import 'swiper/css/pagination'
import '../css/banner.css'

interface BannerProps {
  dataBanner: NewMovieItem[]
}

export default function Banner({ dataBanner }: BannerProps) {
  const nextBtnRef = useRef(null)
  const prevBtnRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const router = useRouter()

  // Filter data by current year
  const currentYear = new Date().getFullYear()
  const filteredData = useMemo(() => {
    const currentYearData = dataBanner.filter((item) => item.year === currentYear)
    return currentYearData.length > 0 ? currentYearData : dataBanner
  }, [dataBanner, currentYear])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.realIndex)
  }

  return (
    <Swiper
      onSlideChange={handleSlideChange}
      navigation={{
        nextEl: nextBtnRef?.current,
        prevEl: prevBtnRef?.current,
      }}
      pagination={{ clickable: true }}
      slidesPerView={1}
      loop={filteredData.length > 1}
      speed={1500}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay, Navigation]}
      className='relative max-w-screen-2xl h-[650px] text-white'
    >
      {filteredData.map((item, index) => {
        return (
          <SwiperSlide key={item._id}>
            <div className='relative w-full h-full'>
              <Image
                src={item.thumb_url}
                alt={item.origin_name}
                width={1920}
                height={500}
                priority
                quality={100}
                className='w-full h-full object-cover object-top'
              />
              <div className='absolute top-0 w-full h-full bg-black bg-opacity-30'></div>
              <div
                className={`absolute top-1/3 left-20 max-lg:left-[25px] max-md:right-[25px] md:w-[540px] flex flex-col gap-4`}
              >
                <div
                  className={`transition-all ${
                    index !== activeSlide
                      ? 'opacity-0 translate-y-1/2'
                      : 'opacity-100 translate-y-0'
                  } grid gap-y-3`}
                  style={{ transitionDuration: '2000ms' }}
                >
                  <p className='text-[42px] max-md:text-3xl font-bold line-clamp-2 leading-tight'>
                    {item.name}
                  </p>
                  <SubtextBanner item={item} />
                </div>
                <Button
                  variant='outline'
                  size='lg'
                  className={`w-[170px] p-0 text-sm uppercase font-medium mt-8 hover:bg-[#242424] hover:bg-opacity-80 hover:text-secondary rounded-full bg-[#242424] border-2 border-yellow-400 transition-all ${
                    index !== activeSlide ? 'invisible opacity-0' : 'visible opacity-100'
                  }`}
                  style={{ transitionDuration: '2000ms', transitionDelay: '1500ms' }}
                  onClick={() => router.push(`/phim/${item.slug}`)}
                >
                  <Play
                    size={15}
                    fill='white'
                    className='mr-3'
                  />
                  Xem ngay
                </Button>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
      {/* Buttons */}
      {filteredData.length > 1 && (
        <div className='absolute z-50 bottom-0 right-20 -translate-y-1/2 flex items-center gap-3'>
          <Button
            ref={prevBtnRef}
            size={'icon'}
            variant={'outline'}
            className='max-md:hidden w-10 h-10 bg-transparent text-primary-foreground hover:text-primary-foreground rounded-full hover:bg-white hover:bg-opacity-30'
          >
            <MoveLeft />
          </Button>
          <Button
            ref={nextBtnRef}
            size={'icon'}
            variant={'outline'}
            className='max-md:hidden w-10 h-10 bg-transparent text-primary-foreground hover:text-primary-foreground rounded-full hover:bg-white hover:bg-opacity-30'
          >
            <MoveRight />
          </Button>
        </div>
      )}
    </Swiper>
  )
}

function SubtextBanner({ item }: { item: NewMovieItem }) {
  return (
    <div className='flex max-md:flex-col text-sm max-md:items-baseline items-center gap-5'>
      <div className='flex items-center gap-3 font-semibold'>
        <div className='bg-white bg-opacity-80 w-12 h-[25px] px-2 flex items-center justify-center text-primary'>
          HD
        </div>
        <div className='bg-white bg-opacity-80 h-[25px] px-2 flex items-center justify-center text-primary'>
          Vietsub
        </div>
      </div>
      <div className='text-gray-50 font-medium flex items-center gap-3'>
        <p className='line-clamp-1 text-base max-w-[200px]'>{item.origin_name}</p>
        <div className='flex-1 flex items-center gap-3'>
          <CalendarDays
            size={20}
            className='text-primary-color'
          />
          {item.year}
        </div>
      </div>
    </div>
  )
}
