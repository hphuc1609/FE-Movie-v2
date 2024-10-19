import movieApi from '@/services/api-client/movies'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE
  const limit = 64

  try {
    const [phimLe, phimBo, hoatHinh, tvShows] = await Promise.all([
      movieApi.getListByCate({ category: 'phim-le', limit }),
      movieApi.getListByCate({ category: 'phim-bo', limit }),
      movieApi.getListByCate({ category: 'hoat-hinh', limit }),
      movieApi.getListByCate({ category: 'tv-shows', limit }),
    ])

    const allMovies = [
      ...phimLe.data.items,
      ...phimBo.data.items,
      ...hoatHinh.data.items,
      ...tvShows.data.items,
    ]

    // Tạo danh sách URL cho sitemap
    const movieUrls = allMovies.map((movie) => ({
      url: `${baseUrl}/phim/${movie.slug}`,
      lastModified: new Date(movie.modified.time),
    }))

    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        priority: 1.0,
      },
      ...movieUrls,
    ]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return []
  }
}
