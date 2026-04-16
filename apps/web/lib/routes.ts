export const ROUTES = {
  home: "/",
  wrapped: "/wrapped",
  leaderboard: "/leaderboard",
  ogImage: "/api/og",
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
