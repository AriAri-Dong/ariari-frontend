/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: false,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  images: {
    // domains: ["d19qg9zwo8is96.cloudfront.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d19qg9zwo8is96.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "d19qg9zwo8is96.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
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
};

export default nextConfig;
