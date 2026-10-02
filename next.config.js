/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `next-mdx-remote` v6 ships as ESM only and has to be transpiled
  // when the app is built with Turbopack (the default bundler in Next 16).
  transpilePackages: ["next-mdx-remote"],
};

module.exports = nextConfig;
