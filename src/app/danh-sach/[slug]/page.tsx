import { categorySeo } from '@/data/seo'
import { Metadata } from 'next'
import Detail from './detail'

interface Params {
  params: { slug: string }
  searchParams?: { keyword?: string }
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  try {
    const { slug } = params || {}
    const { keyword } = searchParams || {}
    const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE

    const normalizeSlug = (slug: string): string => {
      return slug
        .split('-')
        .map((word, index) => (index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
        .join('')
    }

    const normalizedSlug = normalizeSlug(slug)

    let seoOnPage = categorySeo[normalizedSlug]
    const isSearchQuery = slug.includes('search') // Ví dụ: nếu slug là search

    if (isSearchQuery) {
      seoOnPage = {
        title: `Kết quả tìm kiếm: ${keyword}`,
        description: `Xem các phim liên quan đến: ${keyword}`,
        keywords: `${keyword}`,
      }
    }

    const ogURL = `danh-sach/${slug}?page=1`

    return {
      title: seoOnPage?.title,
      description: seoOnPage?.description,
      openGraph: {
        title: seoOnPage?.title,
        description: seoOnPage?.description,
        url: `${baseUrl}${ogURL}`,
        images: [''],
      },
      keywords: seoOnPage?.keywords,
    }
  } catch (error: any) {
    console.error(error)
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default function ListPage() {
  return <Detail />
}
