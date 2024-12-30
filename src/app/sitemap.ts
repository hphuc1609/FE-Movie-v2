import { movieDomain, myWebsite } from '@/constants/domain'
import { dataNamPhatHanh, dataTheLoai } from '@/data/category'
import { CountryItem } from '@/models/interfaces/list'
import { MetadataRoute } from 'next'

function generateUrls(basePath: string, data: any[]): MetadataRoute.Sitemap {
  return data.map((item) => ({
    url: `${myWebsite}${basePath && `/${basePath}`}/${item?.slug || item}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const dataQuocGia: CountryItem[] = await fetch(movieDomain + '/quoc-gia')
      .then((res) => res.json())
      .catch(() => [])

    const urls: MetadataRoute.Sitemap = []

    urls.push(...generateUrls('', ['phim-le', 'phim-bo']))
    urls.push(...generateUrls('the-loai', dataTheLoai))
    urls.push(...generateUrls('quoc-gia', dataQuocGia))
    urls.push(...generateUrls('nam', dataNamPhatHanh))

    return [
      {
        url: myWebsite,
        lastModified: new Date(),
        priority: 1,
      },
      ...urls,
    ]
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
