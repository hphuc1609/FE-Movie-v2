'use client'

import CommentBox from '@/components/comment-box'
import BreadcrumbCustom from '@/components/common/breadcrumb-custom'
import ErrorMessage from '@/components/common/error-message'
import ListingWithTitle from '@/components/listing-with-title'
import MovieInfo from '@/components/movie/detail'
import MoviePlayer from '@/components/movie/player'
import { MovieDetailResponse } from '@/models/interfaces/detail'
import { MovieCategory } from '@/models/interfaces/list'
import { useDetail } from '@/services/query-data'
import { useMemo } from 'react'

interface DetailProps {
  urlPath: string
  detailData: MovieDetailResponse
  relatedMovies: MovieCategory
  allMovies: MovieCategory
}

const Detail = (props: DetailProps) => {
  const { urlPath, detailData, relatedMovies, allMovies } = props
  const { data } = useDetail({ slug: urlPath })

  const filteredNewMovies = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const filtered =
      allMovies.items?.filter(
        (movie) =>
          movie.year === currentYear && !movie.category.some((cat) => cat.slug === 'phim-18'),
      ) || []
    return { ...allMovies, items: filtered }
  }, [allMovies])

  const breadCrumb = [
    {
      isCurrent: false,
      name: detailData.movie && `Phim ${detailData.movie.category[0].name}`,
      slug: detailData.movie && `${detailData.movie.category[0].slug}`,
    },
    {
      isCurrent: true,
      name: detailData.movie.name,
    },
  ]

  if (!detailData?.status || typeof detailData !== 'object') {
    return <ErrorMessage message={detailData?.msg} />
  }

  return (
    <>
      <BreadcrumbCustom breadCrumb={breadCrumb} />
      <div className='flex flex-col gap-20 max-sm:gap-10'>
        <MovieInfo detail={detailData.movie} />
        <div className='flex flex-col gap-10'>
          <MoviePlayer
            detail={detailData.movie}
            dataEpisode={data?.episodes || []}
          />
          <CommentBox />
          <ListingWithTitle
            title='Có thể bạn muốn xem'
            data={relatedMovies}
          />
          <ListingWithTitle
            title='Phim mới đề cử'
            data={filteredNewMovies}
          />
        </div>
      </div>
    </>
  )
}

export default Detail
