/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 SIMPLE AND WORKING CONFIGURATION
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  
  // 🖼️ IMAGE OPTIMIZATION
  images: {
    domains: ['images.unsplash.com'],
  },
  
  // 🔒 BASIC SECURITY HEADERS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

