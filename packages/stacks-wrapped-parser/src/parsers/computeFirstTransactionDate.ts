import { RawTransaction } from "../types";

/**
 * Finds the ISO date of the first (earliest) transaction.
 *
 * @param txs - Array of raw transactions.
 * @returns The ISO date string of the earliest transaction, or "N/A" if none found.
 */
export function computeFirstTransactionDate(txs: RawTransaction[]): string {
  if (!Array.isArray(txs) || txs.length === 0) return "N/A";

  const validTxs = txs.filter((tx) => !isNaN(Date.parse(tx.burn_block_time_iso)));
  if (validTxs.length === 0) return "N/A";

  const sorted = [...validTxs].sort(
    (a, b) =>
      Date.parse(a.burn_block_time_iso) - Date.parse(b.burn_block_time_iso)
  );

  return sorted[0].burn_block_time_iso;
}
