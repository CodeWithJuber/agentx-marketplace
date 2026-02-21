import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['img.clerk.com', 'avatars.githubusercontent.com'],
    unoptimized: true,
  },
};

export default nextConfig;