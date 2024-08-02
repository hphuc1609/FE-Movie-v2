import Footer from '@/components/footer'
import Header from '@/components/header'
import LoadingProvider from '@/components/loading-provider'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese'] })

const keyGoogle = process.env.NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS
const baseUrl = process.env.NEXT_PUBLIC_MY_WEBSITE 

export const metadata: Metadata = {
  metadataBase: new URL(`${baseUrl}`),
  keywords: [
    'phim moi',
    'phim le',
    'phim bo',
    'phim hay',
    'phim hoat hinh',
    'me phim',
    'mephim247',
    'Mephim247',
    'phim 247',
    'phim vietsub',
    'phim thuyet minh',
  ],
  title: {
    default: 'Mephim247 - Khám phá phim hay, phim bộ vietsub, thuyết minh hay nhất',
    template: '%s | Mephim247',
  },
  description:
    'Xem trọn phim miễn phí với chất lượng cao tại Mephim247. Cập nhật phim mới vietsub, thuyết minh chất lượng HD nhanh nhất. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
  openGraph: {
    title: 'Mephim247 - Khám phá phim hay, phim bộ vietsub, thuyết minh hay nhất',
    description:
      'Xem trọn phim miễn phí với chất lượng cao tại Mephim247. Cập nhật phim mới vietsub, thuyết minh chất lượng HD nhanh nhất. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mephim247 - Khám phá phim hay, phim bộ vietsub, thuyết minh hay nhất',
    description:
      'Xem trọn phim miễn phí với chất lượng cao tại Mephim247. Cập nhật phim mới vietsub, thuyết minh chất lượng HD nhanh nhất. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='vi'
      suppressHydrationWarning
    >
      <head>
        <meta
          name='google-site-verification'
          content={keyGoogle}
        />
      </head>
      <body className={cn(inter.className, 'bg-[#141414] text-primary-foreground')}>
        <Header />
        <LoadingProvider>
          <main className='overflow-hidden min-h-screen'>{children}</main>
        </LoadingProvider>
        <Footer />
      </body>
    </html>
  )
}
