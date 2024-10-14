// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('bun:sqlite');
    return config;
  },
};

export default nextConfig;
