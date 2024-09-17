import { ImageComponent } from '@/components/common/card-image'
import PlayButton from '@/components/common/play-button'
import SkeletonCard from '@/components/common/skeleton-card'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

interface RelateMoviesProps {
  data: MovieCategoryItem
  title: string
}

const RelateMovies = (props: RelateMoviesProps) => {
  const { data, title } = props
  const mobile = useMediaQuery({ maxWidth: 600 })
  const tablet = useMediaQuery({ maxWidth: 1024 })

  const swiperConfig: SwiperProps = {
    breakpoints: {
      320: { slidesPerView: 2 },
      560: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
      1320: { slidesPerView: 6 },
    },
  }

  return (
    <section
      id='relate-movies'
      className='flex-1 flex flex-col gap-6 mt-5'
    >
      <h3 className='text-2xl max-md:text-xl font-bold text-primary-color uppercase'>{title}</h3>
      <Swiper
        {...swiperConfig}
        spaceBetween={24}
        loop={data.items.length > 5}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        modules={[Autoplay]}
        className='w-full'
      >
        {!data.items.length ? (
          <div className='grid grid-cols-6 max-sm:grid-cols-2 max-xl:grid-cols-5 gap-5 gap-y-7'>
            <SkeletonCard itemLength={mobile ? 2 : tablet ? 5 : 6} />
          </div>
        ) : (
          data.items.map((item, index) => (
            <SwiperSlide
              key={item._id}
              className='!grid !gap-2'
            >
              <Link
                href={`/phim/${item.slug}`}
                className='relative group rounded-sm bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'
              >
                <ImageComponent
                  index={index}
                  data={data}
                  item={item}
                />
                <div className='absolute w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
                <PlayButton
                  PlayIconProps={{ size: 25 }}
                  className='w-[50px] h-[50px] opacity-0 group-hover:opacity-100 transition-all duration-300'
                />
              </Link>
              <Link
                href={`/phim/${item.slug}`}
                className='text-sm grid gap-1'
              >
                <p className='hover:text-primary-color font-semibold line-clamp-2'>
                  {item.name} ({item.year})
                </p>
                <span className='text-white text-opacity-50 line-clamp-2 hover:text-primary-color break-keep'>
                  {item.origin_name}
                </span>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  )
}

export default RelateMovies
