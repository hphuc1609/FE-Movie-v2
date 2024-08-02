import movieApi from '@/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { slug } = params || {}
    const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE

    const res = await movieApi.getDetail({ name: slug })

    if (!isSuccessResponse(res)) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      }
    }

    const seoOnPage = res.movie

    // SEO On Page
    const metaTitle = `Phim ${seoOnPage?.name} (${seoOnPage?.origin_name})`
    const metaDescription = `${seoOnPage?.content} - Xem ngay ${seoOnPage?.name} với chất lượng HD tại Mephim247.`
    const metaUrl = `${baseUrl}/phim/${seoOnPage?.name}`
    const metaImage = seoOnPage?.poster_url

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: metaUrl,
        images: [
          { url: metaImage, width: 1200, height: 630, alt: seoOnPage?.name || 'Movie Poster' },
        ],
      },
    }
  } catch (error: any) {
    console.error(error)
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default function InfoPage() {
  return <Detail />
}
