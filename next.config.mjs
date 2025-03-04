/** @type {import('next').NextConfig} */ 
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        has: [
          {
            type: "cookie",
            key: "sb-access-token",
          },
        ],
        permanent: false,
        destination: "/auth",
      },
    ];
  },
};

export default nextConfig;
