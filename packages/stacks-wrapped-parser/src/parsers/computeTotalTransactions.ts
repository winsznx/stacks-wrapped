import { RawTransaction } from "../types";

export function computeTotalTransactions(txs: RawTransaction[]): number {
  if (!Array.isArray(txs)) return 0;
  return txs.length;
}
