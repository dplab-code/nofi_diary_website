import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NoFi Diary",
    short_name: "NoFi",
    description: "A private, offline-first diary for photos, voice and memories.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f1e8",
    theme_color: "#f8f1e8",
    icons: [
      { src: "/icons/nofi-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/nofi-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
