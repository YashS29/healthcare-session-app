const nextConfig = {
    // ... existing config
    
    experimental: {
      optimizeCss: true,
      scrollRestoration: true,
    },
    
    // Tree shaking optimization
    webpack: (config, { buildId, dev, isServer }) => {
      if (!dev && !isServer) {
        // Enable tree shaking
        config.optimization.usedExports = true;
        config.optimization.sideEffects = false;
        
        // Code splitting
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            mui: {
              test: /[\\/]node_modules[\\/]@mui[\\/]/,
              name: 'mui',
              chunks: 'all',
            },
          },
        };
      }
      return config;
    },
  };