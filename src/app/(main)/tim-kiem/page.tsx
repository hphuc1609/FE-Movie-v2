import { endPoint } from '@/constants/end-point'
import { fetchServer } from '@/helpers/fetch-server'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  searchParams: { keyword: string; page: string }
}

export async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { keyword, page } = searchParams
  try {
    const response = await fetchServer({
      endpoint: endPoint.search,
      params: { keyword, page },
    })
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

export default async function ListSearchPage({ searchParams }: Params) {
  const { keyword, page } = searchParams
  const response = await fetchServer({
    endpoint: endPoint.search,
    params: { keyword, page },
  })

  return (
    <Detail
      data={response.data}
      keyword={keyword}
    />
  )
}
