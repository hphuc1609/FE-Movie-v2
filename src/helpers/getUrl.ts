import { endPoint } from '@/constants/end-point'
import { dataNamPhatHanh, dataQuocGia, dataTheLoai } from '@/data/category'

const segment = {
  theloai: dataTheLoai.map((item) => item.slug),
  namPhatHanh: dataNamPhatHanh.map((item) => item.slug),
  quocGia: dataQuocGia.map((item) => item.slug),
}

const getUrl = (url: string) => {
  const paths = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows']

  if (paths.includes(url)) return `${endPoint.list}`
  if (segment.theloai.includes(url)) return `${endPoint.category}`
  if (segment.namPhatHanh.includes(url)) return `${endPoint.year}`
  if (segment.quocGia.includes(url)) return `${endPoint.country}`
  return null
}

export default getUrl
