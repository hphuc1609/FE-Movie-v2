import movieApi from '@/services/api-client/movies'
import Detail from './detail'
import { Metadata } from 'next'

interface Params {
  searchParams: { keyword: string; page: string }
}

export async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { keyword, page } = searchParams
  try {
    const response = await movieApi.getMoviesSearch({ keyword, page })
    const seoOnPage = response.data.seoOnPage
    return {
      title: `${seoOnPage.titleHead}`,
      description: `${seoOnPage.descriptionHead}`,
    }
  } catch (error: any) {
    console.error(error.message)
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default function ListPage({ searchParams }: Params) {
  return <Detail searchParams={searchParams} />
}
