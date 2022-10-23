/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["mars.jpl.nasa.gov", "mars.nasa.gov", "cdn.discordapp.com"],
  },
};

module.exports = nextConfig;
