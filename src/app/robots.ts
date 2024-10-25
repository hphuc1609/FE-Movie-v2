import { myWebsite } from '@/constants/domain'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/danh-sach/*', '/phim/*'],
      disallow: ['/login', '/register', '/tim-kiem'],
    },
    sitemap: [`${myWebsite}/sitemap.xml`, `${myWebsite}/danh-sach/sitemap.xml`],
  }
}
