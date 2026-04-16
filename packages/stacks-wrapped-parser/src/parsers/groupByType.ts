import { RawTransaction } from "../types";

export function groupByType(txs: RawTransaction[]): Record<string, RawTransaction[]> {
  const groups: Record<string, RawTransaction[]> = {};
  for (const tx of txs) {
    if (!groups[tx.tx_type]) groups[tx.tx_type] = [];
    groups[tx.tx_type].push(tx);
  }
  return groups;
}
