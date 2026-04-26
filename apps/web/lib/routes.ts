export const ROUTES = {
  HOME: "/",
  WRAPPED: (address: string) => `/wrapped?address=${address}`,
  LEADERBOARD: "/leaderboard",
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
