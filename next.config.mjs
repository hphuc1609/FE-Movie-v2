/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE}`,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE_2}`,
        port: '',
        pathname: '/**',
      },
    ],
    // unoptimized: process.env.NODE_ENV === 'production' ? true : false,
  },
}

export default nextConfig
