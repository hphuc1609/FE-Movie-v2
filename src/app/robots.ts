import { myWebsite } from '@/constants/domain'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const rules = {
    userAgent: '*',
    allow: '/',
    disallow: ['/login', '/register', '/tim-kiem'],
  }

  const phimIds = Array.from({ length: 12 }, (_, i) => i + 1)

  const sitemap = ['/sitemap.xml', ...phimIds.map((id) => `/phim/sitemap/${id}.xml`)].map(
    (path) => `${myWebsite}${path}`,
  )

  return { rules, sitemap }
}
