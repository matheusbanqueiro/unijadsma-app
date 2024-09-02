/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "api.dicebear.com",
      "localhost",
      "images.unsplash.com",
      "picsum.photos",
      "source.unsplash.com",
      "via.placeholder.com",
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;