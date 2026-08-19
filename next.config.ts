import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
