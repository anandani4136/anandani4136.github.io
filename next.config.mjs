/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: './',
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|ogv|mov|avi|wmv|flv)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: './_next/static/media/',
            outputPath: 'static/media/',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;