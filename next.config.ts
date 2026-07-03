import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_EXPORT === 'true' ? 'export' : undefined,
  reactStrictMode: true,
  images: {},
  trailingSlash: true,
};

export default nextConfig;
