import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mê Phim 247',
    short_name: 'Mephim247',
    description: 'Trang xem phim chất lượng cao, miễn phí khoong',
    start_url: '/',
    display: 'standalone',
    background_color: '#1c2833',
    theme_color: '#1c2833',
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
