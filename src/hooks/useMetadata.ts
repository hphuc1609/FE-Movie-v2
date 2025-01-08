import { googleKey, myWebsite } from '@/constants/domain'
import { Metadata } from 'next'

type Params = {
  title: string
  description: string
  urlPath?: string
  image?: string | string[]
} & Partial<Metadata>

export const useMetadata = (params: Params) => {
  const { title, description, urlPath = '', image = '/icon.png', ...rest } = params

  return {
    title: `${title} | Mephim247`,
    description,
    alternates: {
      canonical: myWebsite + urlPath,
      types: { 'text/html': myWebsite + urlPath },
    },
    openGraph: {
      title: `${title} | Mephim247`,
      description,
      url: myWebsite + urlPath,
      type: 'website',
      siteName: 'Mephim247',
      locale: 'vi-VN',
      images: image,
    },
    twitter: {
      title: `${title} | Mephim247`,
      description,
      card: 'summary',
      images: image,
    },
    robots: { follow: true, index: true },
    metadataBase: new URL(myWebsite),
    authors: [{ name: 'PhucLuu' }],
    verification: { google: googleKey },
    ...rest,
  } as Metadata
}
