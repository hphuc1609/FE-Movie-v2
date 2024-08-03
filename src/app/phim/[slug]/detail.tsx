'use client'

import movieApi from '@/api-client/movies'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import { ImageComponent } from '@/components/common/card-image'
import ErrorMessage from '@/components/common/error-message'
import PlayButton from '@/components/common/play-button'
import Reviewbox from '@/components/common/review-box'
import { useLoading } from '@/components/loading-provider'
import MovieInfo from '@/components/movie/detail'
import MoviePlayer from '@/components/movie/player'
import { Skeleton } from '@/components/ui/skeleton'
import cleanString from '@/helpers/cleanString'
import useFetchData from '@/hooks/use-fetch'
import { DetailResponse } from '@/models/detail'
import { MovieCategoryItem } from '@/models/list-movie'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import 'swiper/css'

export default function Detail() {
  const pathname = usePathname()
  const slug = pathname.split('/').pop() || ''
  const loader = useLoading()

  // Responsive breakpoints
  const mobile = useMediaQuery({ query: '(max-width: 640px)' })
  const tablet = useMediaQuery({ query: '(max-width: 768px)' })
  const desktop = useMediaQuery({ query: '(max-width: 1024px)' })

  const swiperConfig: SwiperProps = {
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 5,
      },
      // when window width is >= 1120px
      1120: {
        slidesPerView: 6,
      },
    },
  }

  // ------------------ Fetch Data ----------------------------
  const fetchDetail = async (): Promise<DetailResponse | null> => {
    try {
      const res = await movieApi.getDetail({ name: slug })
      return res
    } catch (error: any) {
      console.error('Error fetching movie info:', error.message)
      return null
    } finally {
      loader.hidden()
    }
  }

  const fetchAllMovies = async (limit: number): Promise<MovieCategoryItem | null> => {
    try {
      const phimLeData = await movieApi.getList({ category: 'phim-le', limit })
      const phimBoData = await movieApi.getList({ category: 'phim-bo', limit })

      const concatData = phimLeData.data.items.concat(phimBoData.data.items)
      return { ...phimLeData.data, items: concatData }
    } catch (error: any) {
      console.error('Error fetching all movies:', error.message)
      return null
    } finally {
      loader.hidden()
    }
  }

  const { isLoading, data, isError } = useFetchData({
    queryKey: ['movie', slug],
    queryFn: fetchDetail,
  })

  const { data: allMovies } = useFetchData({
    queryKey: ['all-movies'],
    queryFn: () => fetchAllMovies(64),
  })

  // Filtered data by category
  const filteredDataByCate = useMemo(() => {
    const categoryNames = data?.movie?.category?.map((item) => item.name)
    return {
      ...allMovies,
      items: allMovies?.items.filter((movie) =>
        movie.category.some((cate) => categoryNames?.includes(cate.name)),
      ),
    } as MovieCategoryItem
  }, [allMovies, data?.movie?.category])

  // ------------------ Render UI ----------------------------
  if (isLoading) return <SkeletonCustom />
  if (!data || !data?.status || typeof data !== 'object' || isError)
    return <ErrorMessage message={data?.msg} />

  return (
    <div className='max-w-screen-xl m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <BreadcrumbCustom breadCrumb={data.movie?.name} />
      <MovieInfo detail={data.movie} />
      <MoviePlayer
        detail={data.movie}
        dataEpisode={data.episodes}
      />

      <div className='flex-1 flex flex-col gap-6'>
        <h5 className='text-2xl max-md:text-xl font-semibold uppercase'>Phim đề cử</h5>
        <Swiper
          {...swiperConfig}
          spaceBetween={24}
          loop={(filteredDataByCate.items || []).length > 6}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className='w-full'
        >
          {filteredDataByCate.items?.length > 0
            ? filteredDataByCate.items.map((item, index) => (
                <SwiperSlide
                  key={item._id}
                  className='!grid !gap-2'
                >
                  <Link
                    href={`/phim/${item.slug}`}
                    className='relative group rounded-sm bg-gray-50 bg-opacity-10 flex items-center justify-center overflow-hidden'
                    onClick={() => loader.show()}
                  >
                    <ImageComponent
                      data={filteredDataByCate}
                      index={index}
                      item={item}
                    />
                    <div className='absolute w-full h-full bg-black opacity-0 transition-all duration-300 group-hover:opacity-50' />
                    <PlayButton
                      PlayIconProps={{ size: 25 }}
                      className='w-[50px] h-[50px] opacity-0 group-hover:opacity-100 transition-all duration-300'
                    />
                  </Link>
                  {/* Subtitle */}
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
            : Array.from({ length: mobile ? 2 : tablet ? 3 : desktop ? 4 : 6 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <Skeleton className='max-w-[275px] h-[275px] rounded-md bg-skeleton' />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      <Reviewbox />
    </div>
  )
}

const SkeletonCustom = () => {
  return (
    <div className='max-w-screen-xl m-auto px-10 py-[35px] max-lg:px-[25px] flex flex-col gap-9'>
      <BreadcrumbCustom breadCrumb='...' />
      <div className='flex max-md:flex-col gap-[30px]'>
        <Skeleton className='w-[300px] h-[440px] max-md:m-auto rounded-md bg-skeleton' />
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-[450px] h-[30px] bg-skeleton' />
            <Skeleton className='w-[300px] h-[20px] bg-skeleton' />
          </div>
          <Skeleton className='w-full h-[200px] bg-skeleton' />
          <div className='flex flex-col gap-2'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className='w-[500px] h-[15px] bg-skeleton'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
