import { myWebsite } from '@/constants/domain'
import { endPoint } from '@/constants/end-point'
import { fetchServer } from '@/helpers/fetch-server'
import { MetadataRoute } from 'next'

export async function generateSitemaps() {
  const ids = Array.from({ length: 12 }, (_, i) => i + 1)
  return ids.map((id) => ({ id }))
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const theloai = ['phim-le', 'phim-bo', 'tv-shows', 'hoat-hinh']
  const limit = 64

  try {
    const requests = theloai.map((category) =>
      fetchServer({
        endpoint: `${endPoint.list}/${category}?page=${id}&limit=${limit}`,
        nextOptions: { next: { revalidate: 60 } },
      }),
    )
    const results = await Promise.allSettled(requests)

    const allMovies = [
      ...results
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => result.value?.data?.items),
    ]

    return allMovies.map((movie) => ({
      url: `${myWebsite}/phim/${movie.slug}`,
      lastModified: movie?.modified?.time ? new Date(movie.modified.time) : new Date(),
      changeFrequency: 'daily',
    }))
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return []
  }
}
