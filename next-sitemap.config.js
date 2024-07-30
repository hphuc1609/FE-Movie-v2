module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_MY_WEBSITE,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/500', '/500.html', '/404.html'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_MY_WEBSITE}/sitemap.xml`],
  },
  sitemapSize: 7000,
}
