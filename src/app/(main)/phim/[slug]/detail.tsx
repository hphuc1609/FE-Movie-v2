'use client'

import CommentBox from '@/components/comment-box'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import ErrorMessage from '@/components/common/error-message'
import RelateMovies from '@/components/relate-movies'
import MovieInfo from '@/components/movie/detail'
import MoviePlayer from '@/components/movie/player'
import { Skeleton } from '@/components/ui/skeleton'
import { DetailResponse } from '@/models/interfaces/detail'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import { useMoviesByCate } from '@/services/query-data'
import { useMemo } from 'react'

interface DetailProps {
  detail: DetailResponse
}

const Detail = ({ detail }: DetailProps) => {
  const slugCate = detail?.movie?.category?.[0]?.slug

  const { data: movies, isLoading: isLoadingMovies } = useMoviesByCate({
    category: slugCate.toLowerCase() !== 'dang-cap-nhat' ? slugCate : 'phim-le',
    limit: 64,
  })
  const { data: newMovies } = useMoviesByCate({ category: 'phim-le', limit: 64 })

  const filteredNewMovies = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const filtered =
      newMovies?.items?.filter(
        (movie) =>
          movie.year === currentYear && !movie.category.some((cat) => cat.slug === 'phim-18'),
      ) || []

    return {
      ...newMovies,
      items: filtered,
    }
  }, [newMovies])

  if (!detail?.status || typeof detail !== 'object') return <ErrorMessage message={detail?.msg} />

  return (
    <>
      <BreadcrumbCustom breadCrumb={detail.movie.name} />
      {isLoadingMovies ? (
        <SkeletonDetail />
      ) : (
        <>
          <MovieInfo detail={detail.movie} />
          <MoviePlayer
            detail={detail.movie}
            dataEpisode={detail.episodes}
          />
          <CommentBox />
          <RelateMovies
            title='Có thể bạn muốn xem'
            data={movies as MovieCategoryItem}
          />
          <RelateMovies
            title='Phim mới đề cử'
            data={filteredNewMovies as MovieCategoryItem}
          />
        </>
      )}
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
      <Skeleton className='w-full h-[550px] max-xl:h-[250px] rounded-none bg-skeleton' />
    </>
  )
}
