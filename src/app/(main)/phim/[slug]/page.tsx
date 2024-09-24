import { myWebsite } from '@/constants/domain'
import isSuccessResponse from '@/helpers/check-response'
import movieApi from '@/services/api-client/movies'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { slug } = params
    const res = await movieApi.getDetail(slug)

    if (!isSuccessResponse(res)) {
      return {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist',
      }
    }

    const seoOnPage = res.movie

    // Meta data
    const metaTitle = `Phim ${seoOnPage.name} [${seoOnPage.quality} - ${seoOnPage.lang}]`
    const metaDescription = `Xem phim ${seoOnPage.name} - ${seoOnPage.origin_name} chất lượng Full HD tại Mephim247. ${seoOnPage.content}`
    const metaUrl = `${myWebsite}/phim/${seoOnPage.slug}`
    const metaImage = seoOnPage.poster_url || seoOnPage.thumb_url

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: metaUrl,
        images: metaImage,
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

export default async function InfoPage({ params }: Params) {
  const { slug } = params
  const movieInfo = await movieApi.getDetail(slug)

  return <Detail detail={movieInfo} />
}
