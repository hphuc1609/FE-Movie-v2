import { dataNamPhatHanh, dataTheLoai } from '@/data/category'
import movieApi from '@/services/api-client/movies'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dataQuocGia = await movieApi.getCountries()

  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE
  const urls: any = []

  // Thêm URL cho bộ phim
  const movieType = ['phim-le', 'phim-bo']
  movieType.forEach((item) => {
    urls.push({
      url: `${baseUrl}/danh-sach/${item}`,
      lastModified: new Date(),
    })
  })

  // Thêm URL cho từng thể loại
  dataTheLoai.forEach((item) => {
    urls.push({
      url: `${baseUrl}/danh-sach/${item.slug}`,
      lastModified: new Date(),
    })
  })

  // Thêm URL cho từng quốc gia
  dataQuocGia.forEach((item) => {
    urls.push({
      url: `${baseUrl}/danh-sach/${item.slug}`,
      lastModified: new Date(),
    })
  })

  // Thêm URL cho năm phát hành
  dataNamPhatHanh.forEach((item) => {
    urls.push({
      url: `${baseUrl}/danh-sach/${item.slug}`,
      lastModified: new Date(),
    })
  })

  try {
    return urls
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return []
  }
}
