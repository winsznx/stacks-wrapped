/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@winsznx/stacks-wrapped-parser"],
  poweredByHeader: false,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      stream: false,
      buffer: false,
    };
    return config;
  },
};

module.exports = nextConfig;
