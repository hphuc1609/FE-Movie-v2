import { myWebsite } from '@/constants/domain'
import { endPoint } from '@/constants/end-point'
import { fetchServer } from '@/helpers/fetch-server'
import { MovieCategoryItem, MovieCategoryResponse } from '@/models/interfaces/list-movie'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Detail from './detail'
import isSuccessResponse from '@/helpers/check-response'
import { dataNamPhatHanh, dataQuocGia, dataTheLoai } from '@/data/category'

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

  try {
    if (slug.includes('phim-moi-cap-nhat')) return {}

    const response: MovieCategoryResponse = await fetchServer({
      endpoint: `${getUrl(lastSegment)}/${lastSegment}`,
      params: { page },
    })
    const seoOnPage = response.data.seoOnPage

    return {
      title: seoOnPage.titleHead,
      description: seoOnPage.descriptionHead,
      openGraph: {
        title: seoOnPage.titleHead,
        description: seoOnPage.descriptionHead,
        url: `${myWebsite}/${slug.join('/')}`,
        images: seoOnPage.og_image.map((image) => ({
          url: `${response.data?.APP_DOMAIN_CDN_IMAGE}/${image}`,
          alt: '',
        })),
        type: seoOnPage.og_type as 'website',
      },
    }
  } catch (error: any) {
    console.error(error.message)
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default async function slugPage({ params, searchParams }: Params) {
  const { slug } = params
  const { page } = searchParams

  const defaultOptions: RequestInit = {
    headers: { 'Cache-Control': 'no-store', Pragma: 'no-cache' },
    cache: 'no-store',
  }

  const lastSegment = slug[slug.length - 1]
  let response = null

  if (slug.includes('phim-moi-cap-nhat')) {
    response = await fetchServer({
      endpoint: endPoint.newMovies,
      params: { page, limit: 36 },
      nextOptions: defaultOptions,
    })
  } else {
    response = await fetchServer({
      endpoint: `${getUrl(lastSegment)}/${lastSegment}`,
      params: { page, limit: 36 },
      nextOptions: defaultOptions,
    })
    response = response?.data
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
