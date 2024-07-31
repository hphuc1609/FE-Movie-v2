import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import { Metadata } from 'next'
import Detail from './detail'

const myWebsite = process.env.NEXT_PUBLIC_MY_WEBSITE

interface Params {
  params: { slug: string }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params

  const res = await movieApi.getDetail({ name: slug })
  if (!isSuccessResponse(res)) return {}

  const seoOnPage = res.movie || {}

  // Default SEO Values
  const defaultSEO = {
    title: 'Xem phim trực tuyến full HD',
    description: 'Xem phim trực tuyến chất lượng cao, cập nhật nhanh nhất.',
    image: `${myWebsite}/images/default-image.png`,
  }

  // SEO On Page
  const metaTitle = seoOnPage.name
    ? `Xem phim ${seoOnPage.name} - ${seoOnPage.origin_name} Full HD Vietsub`
    : defaultSEO.title
  const metaDescription = seoOnPage.content ?? defaultSEO.description
  const metaUrl = `${myWebsite}/phim/${seoOnPage.name ?? ''}`
  const metaImage = seoOnPage.poster_url ?? defaultSEO.image
  const metaKeywords = `xem phim ${seoOnPage.name}, ${seoOnPage.origin_name}, phim trực tuyến, phim HD, ${seoOnPage.category
    .map((category) => category.name)
    .join(', ')}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: [
        {
          url: metaImage,
          width: 800,
          height: 600,
          alt: seoOnPage.name,
        },
      ],
    },
  }
}

export default function InfoPage() {
  return <Detail />
}
