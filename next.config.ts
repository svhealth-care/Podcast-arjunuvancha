import type { NextConfig } from "next";
import path from "path";

const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Allow Airo preview hosts to load Next.js HMR /dev assets.
  allowedDevOrigins: ["airo.dev", "*.airo.dev", "**.airo.dev"],
  // Keep compilation tracing rooted in this app (avoids scanning `/`).
  outputFileTracingRoot: projectRoot,
  // Do not attach @tailwindcss/turbopack here. That loader spawns a
  // process and binds a port, which GoDaddy's sandbox rejects (os error 13).
  // Tailwind is compiled through PostCSS instead, under webpack.
  turbopack: {
    root: projectRoot,
  },
  webpack: (config, { dev }) => {
    // Ensure webpack resolves and watches only within this project.
    config.context = projectRoot;

    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        followSymlinks: false,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "**/dist/**",
          "**/coverage/**",
        ],
      };
    }

    return config;
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
