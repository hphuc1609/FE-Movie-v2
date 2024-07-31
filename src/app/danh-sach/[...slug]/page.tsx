import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import { Metadata } from 'next'
import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'
import Detail from './detail'

const myWebsite = process.env.NEXT_PUBLIC_MY_WEBSITE

interface Params {
  params: { slug: string }
  searchParams: { page?: string }
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = params
  const page = searchParams.page || 1
  const categoryPaths = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']
  const category = categoryPaths.find((item) => item === slug) || 'phim-le'

  const moviesByCate = await movieApi.getList({ category, page, limit: 20 })
  if (!isSuccessResponse(moviesByCate)) return {}

  // SEO On Page
  const seoOnPage = moviesByCate.data.seoOnPage || {}
  const ogType = (seoOnPage.og_type as OpenGraphType) || 'website'
  const ogURL = `${seoOnPage.og_url.startsWith('/') ? seoOnPage.og_url : `/${seoOnPage.og_url}`}`

  return {
    title: seoOnPage.titleHead,
    description: seoOnPage.descriptionHead,
    openGraph: {
      type: ogType,
      title: seoOnPage.titleHead,
      description: seoOnPage.descriptionHead,
      url: `${myWebsite}${ogURL}`,
      images: seoOnPage.og_image.map((image: string) => ({
        url: `${myWebsite}${image.startsWith('/') ? image : `/${image}`}`,
      })),
    },
  }
}

export function generateViewport() {
  return 'width=device-width, initial-scale=1'
}

export default function ListPage() {
  return <Detail />
}
