/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dqjourdsirqmogwzqaav.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

