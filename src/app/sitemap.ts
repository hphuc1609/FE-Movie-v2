import { myWebsite } from '@/constants/domain'
import { dataNamPhatHanh, dataTheLoai } from '@/data/category'
import movieApi from '@/services/api-client/movies'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dataQuocGia = await movieApi.getCountries()
  const urls: MetadataRoute.Sitemap = []

  // Thêm URL cho bộ phim
  const movieType = ['phim-le', 'phim-bo']
  movieType.forEach((movie) => {
    urls.push({
      url: `${myWebsite}/${movie}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })
  })

  // Thêm URL cho thể loại
  dataTheLoai.forEach((movie) => {
    urls.push({
      url: `${myWebsite}/the-loai/${movie.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  })

  // Thêm URL cho quốc gia
  dataQuocGia.forEach((movie) => {
    urls.push({
      url: `${myWebsite}/quoc-gia/${movie.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    })
  })

  // Thêm URL cho năm phát hành
  dataNamPhatHanh.forEach((movie) => {
    urls.push({
      url: `${myWebsite}/nam/${movie.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  })

  try {
    return urls
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return []
  }
}
