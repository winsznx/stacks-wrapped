import { RawTransaction } from "../types";

/**
 * Computes the total number of transactions in the provided array.
 *
 * @param txs - Array of raw transactions.
 * @returns The total transaction count.
 */
export function computeTotalTransactions(txs: RawTransaction[]): number {
  if (!Array.isArray(txs)) return 0;
  return txs.length;
}
