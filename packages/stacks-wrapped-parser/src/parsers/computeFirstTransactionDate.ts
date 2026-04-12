import { RawTransaction } from "../types";

export function computeFirstTransactionDate(txs: RawTransaction[]): string {
  if (txs.length === 0) return "N/A";

  const earliest = txs.reduce((oldest, tx) => {
    const txTime = new Date(tx.burn_block_time_iso).getTime();
    const oldestTime = new Date(oldest.burn_block_time_iso).getTime();
    return txTime < oldestTime ? tx : oldest;
  });

  return earliest.burn_block_time_iso;
}
