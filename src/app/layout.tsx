import Footer from '@/components/footer'
import Header from '@/components/header'
import LoadingProvider from '@/components/loading-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese'] })

const myWebsite = process.env.NEXT_PUBLIC_MY_WEBSITE
const keyGoogle = process.env.NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS

export const metadata: Metadata = {
  title: 'Mephim247 | Phim Mới | Phim Bộ Vietsub Hay Nhất',
  description:
    'Xem phim online miễn phí với chất lượng cao. Mephim247 cập nhật phim Vietsub, Thuyết minh chất lượng HD nhanh nhất. Tận hưởng các bộ phim hấp dẫn với đa dạng thể loại.',
  keywords:
    'phim bộ, phim lẻ, phim, xem phim, phim online, phim vietsub, phim thuyết minh, phim hay, phim mới, phim hd, Mephim247, mephim 247, phim 247, 247 phim, mê phim',
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
  robots: 'index, follow',
  authors: [{ name: 'Mephim247' }],
  creator: 'PhucLuu',
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
      <Head>
        <meta
          name='google-site-verification'
          content={keyGoogle}
        />
        <link
          rel='canonical'
          href={`${myWebsite}`}
        />
      </Head>
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
