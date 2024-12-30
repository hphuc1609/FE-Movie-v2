import { myWebsite } from '@/constants/domain'
import { endPoint } from '@/constants/end-point'
import { dataTheLoai } from '@/data/category'
import { useFetch } from '@/hooks'
import { MovieCategory } from '@/models/interfaces/list'
import { MetadataRoute } from 'next'

type Sitemap = {
  id: number
}

export async function generateSitemaps() {
  const ids = Array.from({ length: 26 }, (_, i) => i + 1)
  return ids.map((id) => ({ id }))
}

export default async function sitemap({ id }: Sitemap): Promise<MetadataRoute.Sitemap> {
  let theLoai = dataTheLoai.map((item) => item.slug)
  theLoai.push('phim-le', 'phim-bo')

  const limit = 64
  const isCategoryEndpoint = ['phim-le', 'phim-bo', 'tv-shows', 'hoat-hinh'].includes(
    theLoai[id - 1],
  )

  try {
    const endpoint = isCategoryEndpoint
      ? `${endPoint.list}/${theLoai[id - 1]}?page=${id}&limit=${limit}`
      : `${endPoint.category}/${theLoai[id - 1]}?page=${id}&limit=${limit}`

    const movies: MovieCategory = await useFetch({ endpoint: endpoint })

    if (!movies) {
      throw new Error(`Invalid response from endpoint: ${endpoint}`)
    }

    return movies.items.map((movie) => ({
      url: `${myWebsite}/phim/${movie.slug}`,
      lastModified: movie?.modified?.time ? new Date(movie.modified.time) : new Date('2000-01-01'),
      priority: 0.8,
    }))
  } catch (error) {
    return [
      {
        url: `${myWebsite}`,
        lastModified: new Date(),
        priority: 1,
      },
    ]
  }
}
