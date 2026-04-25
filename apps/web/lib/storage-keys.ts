const STORAGE_VERSION = "v2";

export const STORAGE_KEYS = {
  WRAPPED_STATS: `stacks-wrapped:${STORAGE_VERSION}:stats`,
  LEADERBOARD_CACHE: `stacks-wrapped:${STORAGE_VERSION}:leaderboard`,
  THEME_PREFERENCE: `stacks-wrapped:${STORAGE_VERSION}:theme`,
  LAST_CONNECTED_WALLET: `stacks-wrapped:${STORAGE_VERSION}:wallet`,
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

export const STORAGE_VERSION = "1.0.0";
