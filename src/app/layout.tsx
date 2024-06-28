/* eslint-disable @next/next/no-sync-scripts */
import Header from '@/components/header'
import Loader from '@/components/loader'
import LoadingProvider from '@/components/loading-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'VPhim247 - Xem phim online miễn phí chất lượng cao',
  description:
    'VPhim247 cung cấp dịch vụ xem phim online miễn phí với chất lượng cao. Tận hưởng các bộ phim hấp dẫn với đa dạng thể loại.',
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
        <LoadingProvider>
          <Loader />
          <Header />
          <main className='min-h-screen overflow-hidden'>{children}</main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  )
}
