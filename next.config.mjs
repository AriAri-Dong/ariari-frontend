/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
