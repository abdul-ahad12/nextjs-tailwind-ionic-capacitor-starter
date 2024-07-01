module.exports = {
  basePath: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
  swcMinify: true,
  transpilePackages: [
    '@ionic/react',
    '@ionic/core',
    '@stencil/core',
    'ionicons',
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'),
      '@components/ui': path.resolve(__dirname, 'components/ui'),
      '@components/ui/common': path.resolve(__dirname, 'components/ui/common'),
      '@utils': path.resolve(__dirname, 'utils'),
    };
    return config;
  },
};
