import type { MetadataRoute } from "next";

const BASE = "https://www.whupmedya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/admin`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
  ];
}
