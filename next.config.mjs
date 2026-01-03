/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Set base path to your repository name (update if different)
  basePath: '/portfolio1',

  // Enable React strict mode for better debugging
  reactStrictMode: true,

  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
