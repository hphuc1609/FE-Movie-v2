import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mê Phim 247',
    short_name: 'MePhim247',
    description: 'Trang xem phim chất lượng cao, miễn phí',
    start_url: '/',
    display: 'standalone',
    background_color: '#eab308',
    theme_color: '#eab308',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    scope: '/',
  }
}
