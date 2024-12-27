import PlayButton from '@/components/common/play-button'
import { MovieCategory, MovieItem } from '@/models/interfaces/list'
import { StepBack, StepForward } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react'
import { ImageComponent } from './common/card-image'
import { Button } from './ui/button'

interface ListingWithTitleProps {
  data: MovieCategory
  title: string
}

const ListingWithTitle = (props: ListingWithTitleProps) => {
  const { data, title } = props

  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<SwiperRef>(null)
  const mobile = useMediaQuery({ maxWidth: 750 })

  const swiperConfig: SwiperProps = {
    breakpoints: {
      320: { slidesPerView: 3 },
      560: { slidesPerView: 4 },
      900: { slidesPerView: 5 },
      1024: { slidesPerView: 6 },
    },
  }

  const handleNavigate = (item: MovieItem) => {
    return `/phim/${item.slug}`
  }

  if (!data || !data.items.length) return null

  return (
    <section
      id='related-movies'
      className='flex-1 flex flex-col gap-6'
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl max-md:text-xl font-bold text-primary-color uppercase'>{title}</h3>
        <div className='flex gap-1'>
          <Button
            variant='link'
            className='text-white/50 w-fit h-fit p-1 fill-current'
            title='Sau'
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <StepBack
              className='w-4 h-4'
              fill='current'
            />
          </Button>
          <Button
            variant='link'
            className='text-white/50 w-fit h-fit p-1 fill-current'
            title='Trước'
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <StepForward
              className='w-4 h-4'
              fill='current'
            />
          </Button>
        </div>
      </div>
      <Swiper
        {...swiperConfig}
        ref={swiperRef}
        onNavigationNext={() => nextBtnRef.current?.click()}
        onNavigationPrev={() => prevBtnRef.current?.click()}
        spaceBetween={mobile ? 12 : 24}
        loop={data.items.length > 5}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        modules={[Autoplay]}
        className='w-full'
      >
        {data.items.map((item, index) => (
          <SwiperSlide
            key={item._id}
            className='!grid !gap-2'
          >
            <Link
              href={handleNavigate(item)}
              className='relative group bg-skeleton flex items-center justify-center overflow-hidden shadow-black/50 shadow-lg'
            >
              <ImageComponent
                index={index}
                item={item}
              />
              <div className='absolute w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
              <PlayButton
                PlayIconProps={{ size: 25 }}
                className='w-[50px] h-[50px] opacity-0 group-hover:opacity-100 transition-all duration-300'
              />
            </Link>
            <Link
              title={item.name}
              href={handleNavigate(item)}
              className='text-sm max-sm:text-xs grid gap-1 hover:text-primary-color font-semibold line-clamp-2'
            >
              {item.name} ({item.year})
            </Link>
            <Link
              title={item.origin_name}
              href={handleNavigate(item)}
              className='text-sm max-sm:text-xs grid gap-1 text-white text-opacity-50 line-clamp-2 hover:text-primary-color break-keep'
            >
              {item.origin_name}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ListingWithTitle
