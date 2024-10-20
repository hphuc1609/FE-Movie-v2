import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/danh-sach/*', '/phim/*'],
      disallow: ['/danh-sach/tim-kiem?keyword=*'],
    },
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/danh-sach/sitemap.xml`],
  }
}
