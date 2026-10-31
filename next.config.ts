import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/conversations", destination: "/#atlas", permanent: true },
      { source: "/conversations/:slug", destination: "/#atlas", permanent: true },
      { source: "/voices", destination: "/#atlas", permanent: true },
      { source: "/voices/:slug", destination: "/#atlas", permanent: true },
      { source: "/journey", destination: "/#journey", permanent: true },
      { source: "/public-life", destination: "/#atlas", permanent: true },
      { source: "/host", destination: "/#host", permanent: true },
      { source: "/credits", destination: "/#credits", permanent: true },
    ];
  },
};

export default nextConfig;
