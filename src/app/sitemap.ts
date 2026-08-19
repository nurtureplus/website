import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const siteUrl = "https://www.nurtureplus.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...productUrls,
  ];
}
