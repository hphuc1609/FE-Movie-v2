import { myWebsite } from '@/constants/domain'
import { endPoint } from '@/constants/end-point'
import { dataNamPhatHanh, dataTheLoai } from '@/data/category'
import { fetchServer } from '@/helpers/fetch-server'
import { MovieCategoryItem, MovieCategoryResponse } from '@/models/interfaces/list-movie'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
  searchParams: { page: string }
}

const lastSegment = {
  danhSach: ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows'],
  theloai: dataTheLoai.map((item) => item.slug),
  namPhatHanh: dataNamPhatHanh.map((item) => item.slug),
}

const getUrl = (slug: string) => {
  if (lastSegment.danhSach.includes(slug)) return `${endPoint.list}`
  if (lastSegment.theloai.includes(slug)) return `${endPoint.category}`
  if (lastSegment.namPhatHanh.includes(slug)) return `${endPoint.year}`
  return `${endPoint.country}`
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = params
  const { page } = searchParams

  try {
    if (slug === 'phim-moi-cap-nhat') return {}

    const response: MovieCategoryResponse = await fetchServer({
      endpoint: `${getUrl(slug)}/${slug}`,
      params: { page, limit: 36 },
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

export default async function ListPage({ params, searchParams }: Params) {
  const { slug } = params
  const { page } = searchParams

  let response
  if (slug === 'phim-moi-cap-nhat') {
    response = await fetchServer({
      endpoint: endPoint.newMovies,
      params: { page, limit: 36 },
    })
  } else {
    response = await fetchServer({
      endpoint: `${getUrl(slug)}/${slug}`,
      params: { page, limit: 36 },
    })
    response = response.data
  }

  return (
    <Detail
      data={response as MovieCategoryItem}
      slug={params.slug}
      page={page}
    />
  )
}
