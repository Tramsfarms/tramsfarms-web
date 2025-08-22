/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tramsfarms.faithstream.com.ng",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "api.tramsfarms.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
