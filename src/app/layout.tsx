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
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese'] })
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy='afterInteractive'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

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
