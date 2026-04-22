const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }
  return value;
};

export const HIRO_API_BASE = getEnv("NEXT_PUBLIC_HIRO_API_BASE");
export const CONTRACT_DEPLOYER = getEnv("NEXT_PUBLIC_CONTRACT_DEPLOYER");
export const CONTRACT_NAME = getEnv("NEXT_PUBLIC_CONTRACT_NAME");
export const CONTRACT_IDENTIFIER = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}`;
export const STACKS_NETWORK = getEnv("NEXT_PUBLIC_NETWORK");
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacks-wrapped-web.vercel.app";
export const TX_FETCH_LIMIT = 50;
export const TX_MAX_PAGES = 10;
export const LEADERBOARD_POLL_INTERVAL = 30_000;
export const LEADERBOARD_EVENT_LIMIT = 20;
