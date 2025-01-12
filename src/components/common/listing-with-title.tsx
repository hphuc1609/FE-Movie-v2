import { MovieCategory, MovieItem } from '@/models/interfaces/list'
import { Play, StepBack, StepForward } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react'
import { Button } from '../ui/button'
import { ImageComponent } from './card-image'
import { cn } from '@/lib/utils'

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
          <SwiperSlide key={item._id}>
            <Link
              title={item.name}
              href={handleNavigate(item)}
              className='relative group bg-skeleton flex items-center justify-center overflow-hidden shadow-black/50 shadow-lg'
            >
              <ImageComponent
                index={index}
                item={item}
              />
              <div className='absolute w-full h-full bg-black/0 transition-all flex group-hover:bg-black/50'>
                <Play
                  size={50}
                  fill='currentColor'
                  className='m-auto group-hover:block hidden border border-white rounded-full p-2'
                />
              </div>
              {/* Episode and quality */}
              <div className='absolute top-1 bottom-1 left-1 right-1 flex flex-col gap-1 text-xs max-sm:text-xs font-medium'>
                {item.lang && item.episode_current && (
                  <span className='w-fit bg-gradient-to-r from-orange-700 to-yellow-500 px-2 py-1 rounded-sm line-clamp-1'>
                    {item.episode_current.toLowerCase() !== 'full'
                      ? item.episode_current
                      : `${item.quality} ${item.lang.split('+')[0]}`}
                  </span>
                )}
              </div>
            </Link>
            <Link
              title={item.name}
              href={handleNavigate(item)}
              className='text-sm max-sm:text-xs hover:text-primary-color font-semibold line-clamp-2 mt-4'
            >
              {item.name} ({item.year})
            </Link>
            <Link
              title={item.origin_name}
              href={handleNavigate(item)}
              className='text-sm max-sm:text-xs text-white text-opacity-50 line-clamp-2 hover:text-primary-color mt-2'
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
