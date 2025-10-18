/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com`,
      },
    ],
  },
  // experimental: {
  //   serverExternalPackages: ["@aws-sdk/client-s3", "sharp"],
  // },
};

export default nextConfig;
