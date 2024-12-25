import ContextProvider from '@/components/context-provider'
import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'
import QRCodeButton from '@/components/qrcode'
import TanstackProvider from '@/components/tanstack-provider'
import { Toaster } from '@/components/ui/toaster'
import { googleKey } from '@/constants/domain'
import { useMetadata } from '@/hooks'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese'] })

export const metadata = useMetadata({
  title: 'Phim Hay | Phim mới | Phim HD Vietsub',
  description:
    'Mephim247 cung cấp phim miễn phí chất lượng cao với phụ đề vietsub - thuyết minh - lồng tiếng, mang đến những bộ phim hấp dẫn hay nhất và mới nhất với nhiều thể loại.',
  verification: { google: googleKey },
})

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
      <body className={cn(inter.className, 'relative bg-[#1a1a1a] text-primary-foreground')}>
        <TanstackProvider>
          <ContextProvider>
            <Header />
            <main className='overflow-hidden min-h-screen'>{children}</main>
            <Footer />
          </ContextProvider>
        </TanstackProvider>
        <QRCodeButton />
        <Toaster />
      </body>
    </html>
  )
}
