/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/ghsa2025",
  assetPrefix: "/ghsa2025",
  output: "export",
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