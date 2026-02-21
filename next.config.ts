import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'docs',
  basePath: '/agentx-marketplace',
  assetPrefix: '/agentx-marketplace',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;