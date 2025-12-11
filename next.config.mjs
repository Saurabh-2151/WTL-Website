/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: false,
  },

  webpack: (config) => {
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
