import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'
import ContextProvider from '@/components/context-provider'
import TanstackProvider from '@/components/tanstack-provider'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { googleKey, myUrl } from '@/constants/domain'

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  metadataBase: new URL(`${myUrl}`),
  title: {
    default: 'Phim Mới, Phim Bộ Vietsub & Thuyết minh | MePhim247',
    template: '%s | MePhim247',
  },
  description:
    'Xem phim miễn phí chất lượng cao tại Mê Phim - MePhim247 với phụ đề vietsub - thuyết minh - lồng tiếng. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
  openGraph: {
    title: 'Phim Mới, Phim Bộ Vietsub & Thuyết minh | MePhim247',
    description:
      'Xem phim miễn phí chất lượng cao tại Mê Phim - MePhim247 với phụ đề vietsub - thuyết minh - lồng tiếng. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
    url: `${myUrl}`,
    siteName: 'MePhim247',
    images: './icon.png',
    locale: 'vi',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Phim Mới, Phim Bộ Vietsub & Thuyết minh | MePhim247',
    description:
      'Xem phim miễn phí chất lượng cao tại Mê Phim - MePhim247 với phụ đề vietsub - thuyết minh - lồng tiếng. Thưởng thức các bộ phim hấp dẫn với nhiều thể loại khác nhau.',
    images: './icon.png',
  },
  robots: { index: true, follow: true },
  icons: { shortcut: '/favicon.ico' },
  verification: { google: googleKey },
  referrer: 'origin-when-cross-origin',
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
