const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' },
    ],
  },
  experimental: {
    serverActions: {
      enabled: true,
      bodySizeLimit: '10mb', // 0 = no limit
    },
  },
};

export default nextConfig;
