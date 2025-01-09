import Loader from '@/components/loader'
import { endPoint } from '@/constants/end-point'
import { dataNamPhatHanh, dataQuocGia, dataTheLoai, movieTypes } from '@/data/category'
import isSuccessResponse from '@/helpers/check-response'
import generateKeywords from '@/helpers/generateKeywords'
import getUrl from '@/helpers/getUrl'
import { useFetch, useMetadata } from '@/hooks'
import { MovieCategory } from '@/models/interfaces/list'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Detail from './detail'

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

  const matchedType = movieTypes.find((item) => item.slug === lastSegment)?.name
  const matchedGenre = dataTheLoai.find((item) => item.slug === lastSegment)?.name
  const matchedCountry = dataQuocGia.find((item) => item.slug === lastSegment)?.name
  const matchedYear = dataNamPhatHanh.find((item) => item.slug === lastSegment)?.name

  const keywords = generateKeywords({
    type: matchedType,
    genre: matchedGenre,
    country: matchedCountry,
    year: matchedYear,
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
      keywords,
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
  const revalidate = 10

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
        slug={slug}
        page={page}
      />
    </Suspense>
  )
}
