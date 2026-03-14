/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['transform.octanecdn.com', 'octanecdn.com', 'i.ytimg.com', 'yt3.ggpht.com'],
  },
}

module.exports = nextConfig;
