import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devsmrtcvstgtemplates.blob.core.windows.net',
        port: '',
        pathname: '/templates/**',
      },
    ],
  },
};

export default nextConfig;
