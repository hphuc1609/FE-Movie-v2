import { Metadata } from 'next'
import Detail from './detail'
import { useMetadata } from '@/hooks'

export async function generateMetadata(): Promise<Metadata> {
  return useMetadata({
    title: 'Phim Yêu Thích',
    description: 'Phim yêu thích của tôi.',
  })
}

export default async function FavouritePage() {
  return <Detail />
}
