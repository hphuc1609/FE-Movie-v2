import Footer from '@/components/footer'
import Header from '@/components/header'
import LoadingProvider from '@/components/loading-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese'] })
const myWebsite = process.env.NEXT_PUBLIC_MY_WEBSITE

export const metadata: Metadata = {
  title: 'Mephim247 - Khám phá phim hay, phim mới vietsub, thuyết minh chất lượng cao',
  description:
    'Mephim247 cung cấp dịch vụ xem phim online miễn phí với chất lượng cao. Tận hưởng các bộ phim hấp dẫn với đa dạng thể loại.',
  keywords:
    'phim, xem phim online, phim vietsub, phim thuyết minh, phim hay, phim mới, phim chất lượng cao, phim miễn phí',
  robots: 'noindex, nofollow',
  authors: [{ name: 'Mephim247' }],
  creator: 'PhucLuu',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: `${myWebsite}`,
    siteName: 'Mephim247',
    title: 'Mephim247 - Khám phá phim hay, phim mới vietsub, thuyết minh chất lượng cao',
    description:
      'Mephim247 cung cấp dịch vụ xem phim online miễn phí với chất lượng cao. Tận hưởng các bộ phim hấp dẫn với đa dạng thể loại.',
    images: [
      {
        url: `${myWebsite}/images/logo.png`,
        width: 800,
        height: 600,
        alt: 'Mephim247',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Mephim247',
    title: 'Mephim247 - Khám phá phim hay, phim mới vietsub, thuyết minh chất lượng cao',
    description:
      'Mephim247 cung cấp dịch vụ xem phim online miễn phí với chất lượng cao. Tận hưởng các bộ phim hấp dẫn với đa dạng thể loại.',
    images: [
      {
        url: `${myWebsite}/images/logo.png`,
        alt: 'Mephim247 Logo',
      },
    ],
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
