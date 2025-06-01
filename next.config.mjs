/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/gsha-ideas",
  assetPrefix: "/gsha-ideas",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig