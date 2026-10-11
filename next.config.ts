import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    devtoolSegmentExplorer: false,
  },
  async redirects() {
    return [
      // /stream became /youtube; old links live on in video descriptions and socials.
      { source: "/stream", destination: "/youtube", permanent: true },
    ];
  },
};

export default nextConfig;
