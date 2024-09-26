import { myWebsite } from '@/constants/domain'
import movieApi from '@/services/api-client/movies'
import Detail from './detail'

interface Params {
  params: { slug: string }
  searchParams: { keyword: string; page: string }
}

export async function generateMetadata({ params, searchParams }: Params) {
  const { slug } = params
  const { keyword, page } = searchParams

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

    if (slug === 'phim-moi-cap-nhat') return

    const dataCategory = await movieApi.getListByCate({ category: slug, page })
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
