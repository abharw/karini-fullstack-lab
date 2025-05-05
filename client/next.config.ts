import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
  },
};

export default nextConfig;
