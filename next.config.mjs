/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Disable Turbopack completely
    enabled: false,
  },

  // REMOVE WEBPACK CONFIG – Next.js 16 no longer supports it!
  // REMOVE eslint – no longer supported in next.config

  experimental: {
    webpackBuildWorker: false,
  }
};

export default nextConfig;
