import movieApi from '@/services/api-client/movies'
import isSuccessResponse from '@/helpers/check-response'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { slug } = params
    const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE
    const res = await movieApi.getDetail(slug)

    if (!isSuccessResponse(res)) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      }
    }

    const seoOnPage = res.movie

    // Meta data
    const metaTitle = `Phim ${seoOnPage.name}`
    const metaDescription = `Xem phim ${seoOnPage.name} - ${seoOnPage.origin_name} với chất lượng HD tại Mephim247. ${seoOnPage.content}`
    const metaUrl = `${baseUrl}/phim/${seoOnPage.slug}`
    const metaImage = seoOnPage.poster_url || seoOnPage.thumb_url

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: metaUrl,
        images: [{ url: metaImage, width: 1200, height: 630, alt: seoOnPage.origin_name }],
      },
    }
  } catch (error: any) {
    console.error(error.message)
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default async function InfoPage({ params }: Params) {
  const { slug } = params
  const movieInfo = await movieApi.getDetail(slug)

  return <Detail detail={movieInfo} />
}
