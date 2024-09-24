import movieApi from '@/services/api-client/movies'
import { Metadata } from 'next'
import Detail from './detail'
import { myWebsite } from '@/constants/domain'

interface Params {
  params: { slug: string }
  searchParams: { keyword: string }
}

export async function generateMetadata({ params, searchParams }: Params) {
  const { slug } = params
  const { keyword } = searchParams

  try {
    if (keyword) {
      const dataSearch = await movieApi.getMoviesSearch({ keyword })
      const seoOnPage = dataSearch.data.seoOnPage

      return {
        title: seoOnPage.titleHead,
        description: seoOnPage.descriptionHead,
        openGraph: {
          title: seoOnPage.titleHead,
          description: seoOnPage.descriptionHead,
          url: `${myWebsite}/danh-sach/${slug}`,
          images: seoOnPage.og_image.map(
            (image) => `${dataSearch.data.APP_DOMAIN_CDN_IMAGE}/${image}`,
          ),
        },
      }
    }

    const dataCategory = await movieApi.getListByCate({ category: slug })
    const seoOnPage = dataCategory.data.seoOnPage

    return {
      title: seoOnPage.titleHead,
      description: seoOnPage.descriptionHead,
      openGraph: {
        title: seoOnPage.titleHead,
        description: seoOnPage.descriptionHead,
        url: `${myWebsite}/danh-sach/${slug}`,
        images: seoOnPage.og_image.map(
          (image) => `${dataCategory.data.APP_DOMAIN_CDN_IMAGE}/${image}`,
        ),
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
  const { slug } = params
  return (
    <Detail
      slug={slug}
      searchParams={searchParams}
    />
  )
}
