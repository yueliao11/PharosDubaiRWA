/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // REMOVED to allow dynamic routes with generateStaticParams
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    // Reduce memory usage during build
    workerThreads: false,
    cpus: 1
  },
  // Enhanced webpack configuration to handle cache issues
  webpack: (config, { dev, isServer }) => {
    // Disable cache completely in development
    if (dev) {
      config.cache = false;
      // Add cache directory to watch ignore list
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules/**', '**/.next/cache/**']
      };
    }
    
    // Optimize webpack configuration
    if (!dev && !isServer) {
      config.optimization.minimize = true;
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
      };
    }

    return config;
  }
};

module.exports = nextConfig;