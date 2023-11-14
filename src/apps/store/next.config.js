/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  transpilePackages: ["ui", "database"],
};

module.exports = nextConfig;
