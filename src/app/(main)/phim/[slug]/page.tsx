import { endPoint } from '@/constants/end-point'
import isSuccessResponse from '@/helpers/check-response'
import { useFetch, useMetadata } from '@/hooks'
import { MovieDetail } from '@/models/interfaces/detail'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Detail from './detail'

interface Params {
  params: { slug: string }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const data = await useFetch({
      endpoint: `${endPoint.detail}/${params.slug}`,
      options: { next: { revalidate: 60 } },
    })

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
      images: poster_url,
    })
  } catch (error: any) {
    return {
      title: 'Not Found',
      description: 'The page is not found.',
    }
  }
}

export default async function InfoPage({ params }: Params) {
  const { slug } = params
  const data = await useFetch({ endpoint: `${endPoint.detail}/${slug}` })

  if (!isSuccessResponse(data)) notFound()

  return <Detail detail={data} />
}
