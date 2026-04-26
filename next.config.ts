import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    devtoolSegmentExplorer: false,
  },
  // Evita cache corrompido do webpack no Windows (TypeError em __webpack_modules__, chunk ./20.js).
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
