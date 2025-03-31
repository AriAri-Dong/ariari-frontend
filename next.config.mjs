/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /svgr/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset/resource",
      resourceQuery: { not: [/svgr/] },
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
  images: {
    domains: ["d19qg9zwo8is96.cloudfront.net"],
  },
};

export default nextConfig;
