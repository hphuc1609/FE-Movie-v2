import { myWebsite } from '@/constants/domain'
import { Metadata } from 'next'

type Params = {
  title: string
  description: string
  urlPath?: string
  image?: string
  [key: string]: any
}

export const useMetadata = (params: Params) => {
  const { title, description, urlPath, image = '/icon.png', ...rest } = params

  return {
    title: `${title} | Mephim247`,
    description,
    alternates: { canonical: myWebsite + urlPath },
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
    referrer: 'origin',
    robots: { follow: true, index: true },
    metadataBase: new URL(myWebsite),
    ...rest,
  } as Metadata
}
