/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better debugging
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
