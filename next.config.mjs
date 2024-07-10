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
    ],
    unoptimized: false,
  },
}

export default nextConfig
