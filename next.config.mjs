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
    // current file loader rule
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.resolve.fallback = { fs: false };
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: [/svgr/] },
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /svgr/,
        use: ["@svgr/webpack"],
      }
    );

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
