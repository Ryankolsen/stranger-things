/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["mars.jpl.nasa.gov"],
  },
};

module.exports = nextConfig;
