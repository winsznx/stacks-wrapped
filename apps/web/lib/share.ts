import type { WrappedStats } from "@winsznx/stacks-wrapped-parser";
import { APP_URL } from "./constants";
import { formatShortDate } from "./date";

export function buildShareText(stats: WrappedStats): string {
  return `Just generated my Stacks Wrapped! [${stats.totalTransactions} txs | ${stats.totalFeesPaidSTX.toFixed(2)} STX fees | since ${formatShortDate(stats.firstTransactionDate)}] - claim yours at ${APP_URL} #StacksWrapped`;
}

export function buildTweetUrl(text: string): string {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
