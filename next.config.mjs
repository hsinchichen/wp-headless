/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'wordpress-1072398-4810848.cloudwaysapps.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
