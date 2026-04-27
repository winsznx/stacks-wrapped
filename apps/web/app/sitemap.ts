import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacks-wrapped-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${APP_URL}/wrapped`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
  ];
}
