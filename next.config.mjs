/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // next/image exige declarar los dominios externos.
    // Picsum sirve desde picsum.photos y redirige a fastly.picsum.photos.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
