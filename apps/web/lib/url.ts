import { APP_URL } from "./constants";

export function buildWrappedUrl(address?: string): string {
  if (!address) return `${APP_URL}/wrapped`;
  return `${APP_URL}/wrapped?address=${encodeURIComponent(address)}`;
}

export function buildLeaderboardUrl(): string {
  return `${APP_URL}/leaderboard`;
}

export function buildHiroExplorerUrl(txId: string): string {
  return `https://explorer.hiro.so/txid/${txId}?chain=mainnet`;
}

export function buildHiroAddressUrl(address: string): string {
  return `https://explorer.hiro.so/address/${address}?chain=mainnet`;
}
