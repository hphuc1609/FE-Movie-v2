import { endPoint } from '@/constants/end-point'
import { useFetch, useMetadata } from '@/hooks'
import { MovieCategoryItem } from '@/models/interfaces/list'
import { Metadata } from 'next'
import Detail from './detail'
import isSuccessResponse from '@/helpers/check-response'

interface Params {
  searchParams: { keyword: string; page: string }
}

export async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { keyword, page } = searchParams

  const queryParams = new URLSearchParams({
    ...(keyword && { keyword }),
    ...(page && { page: page.toString() }),
  })

  try {
    const data = await useFetch({
      endpoint: `${endPoint.search}?${queryParams}`,
    })

    if (!isSuccessResponse(data)) {
      return useMetadata({
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      })
    }

    const { titleHead, descriptionHead } = data.seoOnPage as MovieCategoryItem['seoOnPage']

    return useMetadata({
      title: titleHead,
      description: descriptionHead,
      urlPath: `/tim-kiem?${queryParams}`,
    })
  } catch (error: any) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default async function ListSearchPage({ searchParams }: Params) {
  const { keyword, page } = searchParams

  const queryParams = new URLSearchParams({
    ...(keyword && { keyword }),
    ...(page && { page: page.toString() }),
  })

  const data = await useFetch({ endpoint: `${endPoint.search}?${queryParams}` })

  return (
    <Detail
      data={data}
      keyword={keyword}
    />
  )
}
