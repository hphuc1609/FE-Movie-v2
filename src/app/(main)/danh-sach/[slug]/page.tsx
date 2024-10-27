import { myWebsite } from '@/constants/domain'
import { MovieCategoryItem } from '@/models/interfaces/list-movie'
import movieApi from '@/services/api-client/movies'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
  searchParams: { page: string }
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = params
  const { page } = searchParams

  try {
    if (slug === 'phim-moi-cap-nhat') return {}

    const response = await movieApi.getListByCate({ category: slug, page: page })
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

export default async function ListPage({ params, searchParams }: Params) {
  const { slug } = params
  const { page } = searchParams

  let response
  if (slug === 'phim-moi-cap-nhat') {
    response = await movieApi.getNewMovies({ page })
  } else {
    response = (await movieApi.getListByCate({ category: slug, page, limit: 36 }))?.data
  }

  return (
    <Detail
      data={response as MovieCategoryItem}
      slug={params.slug}
      page={page}
    />
  )
}
