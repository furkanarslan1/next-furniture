import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next Furniture",
    short_name: "NextFurniture",
    description:
      "Discover modern and stylish furniture for your home. Quality collections for living room, bedroom, dining room, home office and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f4f6",
    theme_color: "#374151",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}