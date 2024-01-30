/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {

  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push(' pino-pretty', 'lokijs', 'encoding')
    return config
  },
  typescript: {
    // 注意: 仅在确定你知道自己在做什么时开启此选项 
    ignoreBuildErrors: true,
  },
  eslint: {
    // 忽略在构建时的ESLint错误
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false
};

module.exports = nextConfig;
