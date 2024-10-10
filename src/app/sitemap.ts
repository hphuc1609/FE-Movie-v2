import movieApi from '@/services/api-client/movies'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE

  try {
    const [newMovies, phimLe, phimBo, hoatHinh, tvShows] = await Promise.all([
      movieApi.getNewMovies({}),
      movieApi.getListByCate({ category: 'phim-le' }),
      movieApi.getListByCate({ category: 'phim-bo' }),
      movieApi.getListByCate({ category: 'hoat-hinh' }),
      movieApi.getListByCate({ category: 'tv-shows' }),
    ])

    const allMovies = [
      ...newMovies.items,
      ...phimLe.data.items,
      ...phimBo.data.items,
      ...hoatHinh.data.items,
      ...tvShows.data.items,
    ]

    // Tạo danh sách URL cho sitemap
    const movieUrls = allMovies.map((movie) => ({
      url: `${baseUrl}/phim/${movie.slug}`,
      lastModified: new Date(movie.modified.time).toISOString(),
      changeFreq: 'daily',
      priority: 0.8,
    }))

    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date().toISOString(),
        priority: 1.0,
      },
      ...movieUrls,
      {
        url: `${baseUrl}/danh-sach/phim-le?page=1`,
        lastModified: new Date().toISOString(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/danh-sach/phim-bo?page=1`,
        lastModified: new Date().toISOString(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/danh-sach/hoat-hinh?page=1`,
        lastModified: new Date().toISOString(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/danh-sach/tv-shows?page=1`,
        lastModified: new Date().toISOString(),
        priority: 0.8,
      },
    ]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return []
  }
}
