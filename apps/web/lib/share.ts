import type { WrappedStats } from "@winsznx/stacks-wrapped-parser";

export function buildShareText(stats: WrappedStats): string {
  return [
    "My Stacks Wrapped 2024 \u{1F680}",
    `\u{1F4CA} ${stats.totalTransactions} total transactions`,
    `\u{1F3AF} ${stats.successRate}% success rate`,
    `\u{2B50} Favorite: ${stats.favoriteContract}`,
    "",
    "Get yours at stacks-wrapped-web.vercel.app",
    "#StacksWrapped #Stacks #Bitcoin",
  ].join("\n");
}

export function buildTweetUrl(text: string): string {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function buildShareUrl(address: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacks-wrapped-web.vercel.app";
  return `${base}/wrapped?address=${address}`;
}

// Fixed Twitter share URL formatting
