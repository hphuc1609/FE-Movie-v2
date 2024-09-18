import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'
import ContextProvider from '@/components/context-provider'
import TanstackProvider from '@/components/tanstack-provider'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['vietnamese'] })

const googleKey = process.env.NEXT_PUBLIC_KEY_GOOGLE_ANALYTICS
const myUrl = process.env.NEXT_PUBLIC_MY_WEBSITE

export const metadata: Metadata = {
  metadataBase: new URL(`${myUrl}`),
  keywords: [
    'phim moi',
    'phim le',
    'phim bo',
    'phim hay',
    'hoat hinh',
    'mê phim',
    'mephim',
    'mephim 247',
    'Mephim247',
    'phim vietsub',
    'phim thuyet minh',
  ],
  title: {
    default: 'Mephim247 - Khám phá phim hay, phim bộ vietsub, thuyết minh hay nhất',
    template: '%s | Mephim247',
  },
  description:
    'Xem trọn bộ phim miễn phí với chất lượng cao tại Mephim247. Cập nhật phim mới vietsub, thuyết minh chất lượng HD nhanh nhất. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
  openGraph: {
    title: 'Mephim247 - Khám phá phim hay, phim bộ vietsub, thuyết minh  hay nhất',
    description:
      'Xem trọn bộ phim miễn phí với chất lượng cao tại Mephim247. Cập nhật phim mới vietsub, thuyết minh chất lượng HD nhanh nhất. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mephim247 - Khám phá phim hay, phim bộ vietsub, thuyết minh hay nhất',
    description:
      'Xem trọn bộ phim miễn phí với chất lượng cao tại Mephim247. Cập nhật phim mới vietsub, thuyết minh chất lượng HD nhanh nhất. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
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
          content={googleKey}
        />
      </head>
      <body
        className={cn(
          inter.className,
          'bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] text-primary-foreground',
        )}
      >
        <TanstackProvider>
          <ContextProvider>
            <Header />
            <main className='overflow-hidden min-h-screen'>{children}</main>
            <Footer />
          </ContextProvider>
        </TanstackProvider>
        <Toaster />
      </body>
    </html>
  )
}
