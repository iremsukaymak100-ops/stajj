/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabling experimental cacheComponents to avoid Vercel 404s
  cacheComponents: false,
};

module.exports = nextConfig;
