import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, "") ||
          "localhost" ||
          "*",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "essocttsaurqkofumruw.supabase.co",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
