import { RawTransaction } from "../types";

export function computeTotalTransactions(txs: RawTransaction[]): number {
  return txs.length;
}
