/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
  redirects: async () => {
    return [
      {
        source: '/api',
        destination: '/api/docs',
        permanent: false,
      },
    ];
  },
  httpAgentOptions: {
    keepAlive: true,
  },
};

module.exports = nextConfig;
