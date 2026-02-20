import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
