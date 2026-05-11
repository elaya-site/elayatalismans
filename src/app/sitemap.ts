import { MetadataRoute } from "next";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.elayatalismans.com";

  const collectionUrls = collections.map((c) => ({
    url: `${base}/collections/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const productUrls = products
    .filter((p) => p.ready)
    .map((p) => ({
      url: `${base}/produits/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/maison`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    ...collectionUrls,
    ...productUrls,
  ];
}
