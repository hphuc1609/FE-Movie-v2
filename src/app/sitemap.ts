import movieApi from '@/services/api-client/movies'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_MY_WEBSITE

  const newMovies = await movieApi.getNewMovies({})
  const phimLe = await movieApi.getListByCate({ category: 'phim-le' })
  const phimBo = await movieApi.getListByCate({ category: 'phim-bo' })
  const hoatHinh = await movieApi.getListByCate({ category: 'hoat-hinh' })
  const tvShows = await movieApi.getListByCate({ category: 'tv-shows' })

  const response = {
    items: [
      ...phimLe.data.items,
      ...phimBo.data.items,
      ...newMovies.items,
      ...hoatHinh.data.items,
      ...tvShows.data.items,
    ],
  }

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
    {
      url: `${baseUrl}/danh-sach/hoat-hinh?page=1`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danh-sach/tv-shows?page=1`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
