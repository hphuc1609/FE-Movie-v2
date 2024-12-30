import { endPoint } from '@/constants/end-point'
import { useFetch, useMetadata } from '@/hooks'
import { MovieCategory } from '@/models/interfaces/list'
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
    const data = await useFetch({ endpoint: `${endPoint.search}?${queryParams}` })

    if (!isSuccessResponse(data)) {
      return useMetadata({
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      })
    }

    const { titleHead, descriptionHead, og_image, og_url } =
      data.seoOnPage as MovieCategory['seoOnPage']

    return useMetadata({
      title: titleHead,
      description: descriptionHead,
      urlPath: `/${og_url}`,
      image: og_image.map((path) => `${process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE}${path}`),
    })
  } catch (error: any) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default async function SearchPage({ searchParams }: Params) {
  const { keyword, page } = searchParams

  const queryParams = new URLSearchParams({
    ...(keyword && { keyword }),
    ...(page && { page: page.toString() }),
  })

  const data = await useFetch({
    endpoint: `${endPoint.search}?${queryParams}`,
    options: { next: { revalidate: 3 } },
  })

  return (
    <Detail
      data={data}
      keyword={keyword}
    />
  )
}
