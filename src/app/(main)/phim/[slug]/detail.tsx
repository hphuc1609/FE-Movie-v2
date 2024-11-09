'use client'

import CommentBox from '@/components/comment-box'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import ErrorMessage from '@/components/common/error-message'
import MovieInfo from '@/components/movie/detail'
import MoviePlayer from '@/components/movie/player'
import RelatedMovies from '@/components/related-movies'
import { Skeleton } from '@/components/ui/skeleton'
import { DetailResponse } from '@/models/interfaces/detail'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useFavourites, useMovieType } from '@/services/query-data'
import { useMemo } from 'react'

interface DetailProps {
  detail: DetailResponse
}

const Detail = ({ detail }: DetailProps) => {
  const slugCate = detail?.movie?.category?.[0]?.slug // Lấy thể loại của phim

  const { data: moviesType } = useMovieType({
    category: slugCate?.toLowerCase() !== 'dang-cap-nhat' ? slugCate : 'phim-le',
  })

  const { data: phimLe } = useMovieType({ category: 'phim-le' })
  const { data: phimBo } = useMovieType({ category: 'phim-bo' })

  const allMovies = useMemo(() => {
    return {
      ...phimLe,
      items: [...(phimBo?.items || []), ...(phimLe?.items || [])],
    }
  }, [phimBo, phimLe])

  const filteredNewMovies = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const filtered =
      allMovies?.items?.filter(
        (movie) =>
          movie.year === currentYear && !movie.category.some((cat) => cat.slug === 'phim-18'),
      ) || []

    return {
      items: filtered,
    }
  }, [allMovies?.items])

  const breadCrumb = [
    {
      isCurrent: false,
      name: `Phim ${detail.movie.category[0].name}`,
      slug: `/danh-sach/${detail.movie.category[0].slug}`,
    },
    {
      isCurrent: true,
      name: detail.movie.name,
    },
  ]

  if (!detail?.status || typeof detail !== 'object') return <ErrorMessage message={detail?.msg} />

  return (
    <>
      <BreadcrumbCustom breadCrumb={breadCrumb} />
      <div className='flex flex-col gap-20 max-sm:gap-10'>
        <MovieInfo detail={detail.movie} />
        <div className='flex flex-col gap-10'>
          <MoviePlayer
            detail={detail.movie}
            dataEpisode={detail.episodes}
          />
          <CommentBox />
          <RelatedMovies
            title='Có thể bạn muốn xem'
            data={moviesType as MovieCategoryItem}
          />
          <RelatedMovies
            title='Phim mới đề cử'
            data={filteredNewMovies as MovieCategoryItem}
          />
        </div>
      </div>
    </>
  )
}

export default Detail

const SkeletonDetail = () => {
  return (
    <>
      <div className='flex max-md:flex-col justify-center gap-[30px]'>
        <Skeleton className='w-[300px] h-[440px] m-auto rounded-sm bg-skeleton' />
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='max-w-[450px] h-[20px] bg-skeleton' />
            <Skeleton className='max-w-[300px] h-[20px] bg-skeleton' />
          </div>
          <Skeleton className='w-full h-[200px] bg-skeleton' />
          <div className='flex flex-col gap-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className='max-w-[300px] h-[15px] bg-skeleton'
              />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className='w-full aspect-video rounded-none bg-skeleton' />
    </>
  )
}
