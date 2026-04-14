import { RawTransaction } from "../types";

export function computeFirstTransactionDate(txs: RawTransaction[]): string {
  if (txs.length === 0) return "N/A";

  const sorted = [...txs].sort(
    (a, b) =>
      new Date(a.burn_block_time_iso).getTime() -
      new Date(b.burn_block_time_iso).getTime()
  );

  return sorted[0].burn_block_time_iso;
}
