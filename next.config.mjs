/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/ghsa2025",
  assetPrefix: "/ghsa2025",
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