import movieApi from '@/services/api-client/movies'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE
  const response = await movieApi.getNewMovies({})

  if (!response) return []

  const allMovies = response.items.map((movie) => ({
    url: `${baseUrl}/phim/${movie.slug}`,
    lastModified: new Date(movie.modified.time).toISOString(),
    priority: 0.8,
  }))

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1.0,
    },
    ...allMovies,
    {
      url: `${baseUrl}/danh-sach/phim-le?page=1`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danh-sach/phim-bo?page=1`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
