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

import { MovieCategoryResponse } from '@/models/list-movie'
import 'swiper/css'
import 'swiper/css/pagination'
import '../css/banner.css'

interface BannerProps {
  data: MovieCategoryResponse['data']
}

export default function Banner({ data }: BannerProps) {
  const nextBtnRef = useRef(null)
  const prevBtnRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const router = useRouter()

  // Filter data by current year
  const currentYear = new Date().getFullYear()
  const filteredData = useMemo(() => {
    const currentYearData = data?.items?.filter((item) => item.year === currentYear)
    return currentYearData?.length > 0 ? currentYearData : data?.items?.slice(0, 7) || []
  }, [data, currentYear])

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
      speed={2000}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay, Navigation]}
      className='relative max-w-screen-2xl h-[650px] text-white'
    >
      {filteredData.map((item, index) => {
        return (
          <SwiperSlide key={item._id}>
            <Image
              src={`${data.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`}
              alt={item.origin_name}
              width={1530}
              height={500}
              quality={100}
              loading='lazy'
              className='w-full h-full object-cover object-top'
            />
            <div className='absolute top-0 w-full h-full bg-black bg-opacity-30' />
            <div className='absolute top-1/3 left-20 max-lg:left-[25px] max-md:right-[25px] md:w-[540px] flex flex-col gap-4'>
              <div
                className={`transition-all ${
                  index !== activeSlide ? 'opacity-0 translate-y-1/2' : 'opacity-100 translate-y-0'
                } grid gap-y-3`}
                style={{ transitionDuration: '3000ms', transitionDelay: '1500ms' }}
              >
                <p className='text-[42px] max-md:text-3xl font-bold line-clamp-2 leading-tight'>
                  {item.name}
                </p>
                <SubtextBanner movieItem={item} />
              </div>
              <Button
                variant='outline'
                size='lg'
                className={`w-[170px] p-0 text-sm uppercase font-medium mt-8 hover:bg-[#242424] hover:bg-opacity-80 hover:text-secondary rounded-full bg-[#242424] border-2 border-yellow-400 transition-all ${
                  index !== activeSlide ? 'invisible opacity-0' : 'visible opacity-100'
                }`}
                style={{ transitionDuration: '2000ms', transitionDelay: '3000ms' }}
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

function SubtextBanner({ movieItem }: { movieItem: NewMovieItem }) {
  const { origin_name, year } = movieItem
  const subTitles = ['HD', 'Vietsub']

  return (
    <div className='flex flex-col text-sm gap-5'>
      <div className='flex items-center gap-3'>
        {subTitles.map((subtitle) => (
          <div
            key={subtitle}
            className='bg-white bg-opacity-80 h-[25px] px-2 flex items-center justify-center text-primary font-semibold'
          >
            {subtitle}
          </div>
        ))}
      </div>
      <div className='text-gray-50 font-medium flex items-center gap-3'>
        <p className='line-clamp-1 text-lg'>{origin_name}</p>
        <CalendarDays
          size={20}
          className='text-primary-color'
        />
        {year}
      </div>
    </div>
  )
}
