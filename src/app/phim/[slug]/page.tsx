import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params

  const res = await movieApi.getDetail({ name: slug })
  if (!isSuccessResponse(res)) return {}

  const seoOnPage = res.movie || {}
  const myWebsite = process.env.NEXT_PUBLIC_MY_WEBSITE

  // Default SEO Values
  const defaultTitle = 'Xem phim trực tuyến - Full HD'
  const defaultDescription = 'Xem phim trực tuyến chất lượng cao, cập nhật nhanh nhất.'
  const defaultImage = `${myWebsite}/images/default-image.png`

  // SEO On Page
  const metaTitle = seoOnPage.name
    ? `Xem phim ${seoOnPage.name} (${seoOnPage.origin_name}) trực tuyến - Full HD`
    : defaultTitle
  const metaDescription = seoOnPage.content ?? defaultDescription
  const metaUrl = `${myWebsite}/phim/${seoOnPage.name ?? ''}`
  const metaImage = seoOnPage.poster_url ?? defaultImage

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: metaImage,
    },
  }
}

export default function InfoPage() {
  return <Detail />
}
