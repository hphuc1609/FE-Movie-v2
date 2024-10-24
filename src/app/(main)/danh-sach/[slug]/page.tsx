import { myWebsite } from '@/constants/domain'
import movieApi from '@/services/api-client/movies'
import Detail from './detail'
import { Metadata } from 'next'
import { dataNamPhatHanh } from '@/data/category'

interface Params {
  params: { slug: string }
  searchParams: { page: string }
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = params
  const { page } = searchParams

  try {
    if (slug === 'phim-moi-cap-nhat') return {}

    // Check is movie year
    const isMovieYear = dataNamPhatHanh.find((item) => item.slug === slug)?.name

    const response = await movieApi.getListByCate({
      category: slug,
      page: !isMovieYear ? page : '',
    })
    const seoOnPage = response.data.seoOnPage

    return {
      title: seoOnPage.titleHead,
      description: seoOnPage.descriptionHead,
      openGraph: {
        title: seoOnPage.titleHead,
        description: seoOnPage.descriptionHead,
        url: `${myWebsite}/danh-sach/${slug}`,
        images: seoOnPage.og_image.map((image) => `${response.data.APP_DOMAIN_CDN_IMAGE}/${image}`),
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

export default function ListPage({ params, searchParams }: Params) {
  return (
    <Detail
      slug={params.slug}
      searchParams={searchParams}
    />
  )
}
