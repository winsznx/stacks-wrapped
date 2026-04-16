import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${APP_URL}${ROUTES.home}`, lastModified: now, priority: 1 },
    { url: `${APP_URL}${ROUTES.wrapped}`, lastModified: now, priority: 0.9 },
    { url: `${APP_URL}${ROUTES.leaderboard}`, lastModified: now, priority: 0.8 },
  ];
}
