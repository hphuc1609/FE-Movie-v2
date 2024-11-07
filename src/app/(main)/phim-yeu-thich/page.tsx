import { Metadata } from 'next'
import Detail from './detail'

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: `Phim Yêu Thích`,
    }
  } catch (error: any) {
    console.error(error.message)
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist',
    }
  }
}

export default async function ListFavouritePage() {
  return <Detail />
}
