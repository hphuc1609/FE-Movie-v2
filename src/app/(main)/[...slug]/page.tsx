import { endPoint } from '@/constants/end-point'
import { dataNamPhatHanh, dataQuocGia, dataTheLoai } from '@/data/category'
import isSuccessResponse from '@/helpers/check-response'
import { useFetch, useMetadata } from '@/hooks'
import { MovieCategoryItem } from '@/models/interfaces/list'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Detail from './detail'

interface Params {
  params: { slug: string[] }
  searchParams: { page: string }
}

const lastSegment = {
  theloai: dataTheLoai.map((item) => item.slug),
  namPhatHanh: dataNamPhatHanh.map((item) => item.slug),
  quocGia: dataQuocGia.map((item) => item.slug),
}

const getUrl = (slug: string) => {
  const segments = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']

  if (segments.includes(slug)) return `${endPoint.list}`
  if (lastSegment.theloai.includes(slug)) return `${endPoint.category}`
  if (lastSegment.namPhatHanh.includes(slug)) return `${endPoint.year}`
  if (lastSegment.quocGia.includes(slug)) return `${endPoint.country}`
  return null
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
      options: { next: { revalidate: 60 } },
    })

    if (!isSuccessResponse(data))
      return useMetadata({
        title: 'Not Found',
        description: 'The page is not found.',
        urlPath: `/${slug.join('/')}`,
      })

    const { titleHead, descriptionHead, og_image } =
      data.seoOnPage as MovieCategoryItem['seoOnPage']

    return useMetadata({
      title: titleHead,
      description: descriptionHead,
      urlPath: `/${slug.join('/')}`,
      images: og_image.map((image) => `${data?.APP_DOMAIN_CDN_IMAGE}/${image}`),
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
  let response = null

  const queryParams = new URLSearchParams({
    ...(page && { page: page.toString() }),
    ...(LIMIT && { limit: LIMIT.toString() }),
  })

  if (slug.includes('phim-moi-cap-nhat')) {
    response = await useFetch({
      endpoint: `${endPoint.newMovies}?${queryParams}`,
    })
  } else {
    response = await useFetch({
      endpoint: `${getUrl(lastSegment)}/${lastSegment}?${queryParams}`,
    })
  }

  if (!isSuccessResponse(response)) notFound()

  return (
    <Detail
      data={response as MovieCategoryItem}
      slug={params.slug}
      page={page}
    />
  )
}
