import Footer from '@/components/footer'
import Header from '@/components/header'
import LoadingProvider from '@/components/loading-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'Mephim247 - Khám phá phim hay, phim mới vietsub, thuyết minh chất lượng cao',
  description:
    'Mephim247 cung cấp dịch vụ xem phim online miễn phí với chất lượng cao. Tận hưởng các bộ phim hấp dẫn với đa dạng thể loại.',
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
