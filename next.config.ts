// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // allowedDevOrigins: ['192.168.1.5'], // यहाँ अपना IP डालो
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
