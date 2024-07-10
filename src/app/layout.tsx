/* eslint-disable @next/next/no-sync-scripts */
import Footer from '@/components/footer'
import Header from '@/components/header'
import LoadingProvider from '@/components/loading-provider'
import { cn } from '@/lib/utils'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'VPhim 247 - Khám phá phim hay, phim mới vietsub, thuyết minh chất lượng cao',
  description:
    'VPhim 247 cung cấp dịch vụ xem phim online miễn phí với chất lượng cao. Tận hưởng các bộ phim hấp dẫn với đa dạng thể loại.',
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
      <body className={cn(inter.className, 'min-h-screen bg-[#141414] text-primary-foreground')}>
        <SpeedInsights />
        <LoadingProvider>
          <Header />
          <main className='overflow-hidden'>{children}</main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  )
}
