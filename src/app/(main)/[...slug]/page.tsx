import { endPoint } from '@/constants/end-point'
import isSuccessResponse from '@/helpers/check-response'
import getUrl from '@/helpers/getUrl'
import { useFetch, useMetadata } from '@/hooks'
import { MovieCategory } from '@/models/interfaces/list'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Detail from './detail'
import { Suspense } from 'react'
import Loader from '@/components/loader'

interface Params {
  params: { slug: string[] }
  searchParams: { page: string }
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = params
  const { page } = searchParams
  const lastSegment = slug[slug.length - 1]

  const queryParams = new URLSearchParams({
    ...(page && { page: page.toString() }),
  })

  try {
    if (slug.includes('phim-moi-cap-nhat'))
      return useMetadata({
        title: 'Phim mới cập nhật | Mephim247',
        description: 'Phim mới cập nhật Mephim247.',
        urlPath: '/phim-moi-cap-nhat',
      })

    const data = await useFetch({
      endpoint: `${getUrl(lastSegment)}/${lastSegment}?${queryParams}`,
    })

    if (!isSuccessResponse(data))
      return useMetadata({
        title: 'Not Found',
        description: 'The page is not found.',
        urlPath: `/${slug.join('/')}`,
      })

    const { titleHead, descriptionHead, og_image } = data.seoOnPage as MovieCategory['seoOnPage']

    return useMetadata({
      title: titleHead,
      description: descriptionHead,
      urlPath: `/${slug.join('/')}`,
      image: og_image.map((path) => `${data?.APP_DOMAIN_CDN_IMAGE}${path}`),
    })
  } catch (error: any) {
    return {
      title: 'Not Found',
      description: 'The page is not found.',
    }
  }
}

export default async function ListingPage({ params, searchParams }: Params) {
  const { slug } = params
  const { page } = searchParams

  const lastSegment = slug[slug.length - 1]
  const LIMIT = 36
  const revalidate = 3

  const queryParams = new URLSearchParams({
    ...(page && { page: page.toString() }),
    ...(LIMIT && { limit: LIMIT.toString() }),
  })

  let data = null
  if (slug.includes('phim-moi-cap-nhat')) {
    data = await useFetch({
      endpoint: `${endPoint.newMovies}?${queryParams}`,
      options: { next: { revalidate } },
    })
  } else {
    data = await useFetch({
      endpoint: `${getUrl(lastSegment)}/${lastSegment}?${queryParams}`,
      options: { next: { revalidate } },
    })
  }

  if (!isSuccessResponse(data)) notFound()

  return (
    <Suspense fallback={<Loader />}>
      <Detail
        data={data}
        slug={params.slug}
        page={page}
      />
    </Suspense>
  )
}
