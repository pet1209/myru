/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import PackageJson from './package.json' assert { type: 'json' };
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  env: {
    NEXT_PUBLIC_PNM_VERSION: PackageJson.version,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proxy.myru.online',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/profile/blog/new',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);