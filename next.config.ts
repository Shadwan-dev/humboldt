/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // ✅ Configurar para que no falle el build si no puede descargar fuentes
  experimental: {
    optimizeFonts: true,
  },
  // ✅ Fallback local si no puede descargar
  fontLoaders: [
    {
      loader: '@next/font/google',
      options: {
        fallback: ['system-ui', 'sans-serif'],
      },
    },
  ],
};

module.exports = nextConfig;