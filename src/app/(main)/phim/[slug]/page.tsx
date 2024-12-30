import { endPoint } from '@/constants/end-point'
import isSuccessResponse from '@/helpers/check-response'
import getUrl from '@/helpers/getUrl'
import { useFetch, useMetadata } from '@/hooks'
import { MovieDetail } from '@/models/interfaces/detail'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const data = await useFetch({ endpoint: `${endPoint.detail}/${params.slug}` })

    if (!isSuccessResponse(data))
      return useMetadata({
        title: 'Not Found',
        description: 'The page is not found.',
        urlPath: `/phim/${params.slug}`,
      })

    const { name, origin_name, content, year, slug, poster_url } = data.movie as MovieDetail

    return useMetadata({
      title: `Phim ${name} | ${origin_name} (${year})`,
      description: `Xem phim ${name} - ${origin_name} (${year}). ${content}`,
      urlPath: `/phim/${slug}`,
      image: poster_url,
    })
  } catch (error: any) {
    return {
      title: 'Not Found',
      description: 'The page is not found.',
    }
  }
}

export default async function MovieDetailPage({ params }: Params) {
  const { slug } = params

  // Get detail
  const detail = await useFetch({
    endpoint: `${endPoint.detail}/${slug}`,
  })

  // Get movie category
  const url = detail?.movie?.category?.[0]?.slug
  const relatedMovies = await useFetch({ endpoint: `${getUrl(url)}/${url}` })

  // Phim lẻ, phim bộ
  const movies = await Promise.all([
    useFetch({ endpoint: `${endPoint.list}/phim-le` }),
    useFetch({ endpoint: `${endPoint.list}/phim-bo` }),
  ])
  const [dataPhimLe, dataPhimBo] = movies

  let allMovies = { ...dataPhimLe, items: [] }
  allMovies.items = [...allMovies.items, ...dataPhimBo.items]

  return (
    <Detail
      urlPath={slug}
      detailData={detail}
      relatedMovies={relatedMovies}
      allMovies={allMovies}
    />
  )
}
