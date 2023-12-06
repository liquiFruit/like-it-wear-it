// TODO: refactor this between store and admin

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@like-it-wear-it/ui", "@like-it-wear-it/database"],

  // FIXME: use image host instead
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
    ],
  },
}

module.exports = nextConfig
