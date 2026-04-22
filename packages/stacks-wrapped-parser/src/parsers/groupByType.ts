import { RawTransaction } from "../types";

export function groupByType(txs: RawTransaction[]): Record<string, RawTransaction[]> {
  return txs.reduce((groups, tx) => {
    const { tx_type } = tx;
    if (!groups[tx_type]) {
      groups[tx_type] = [];
    }
    groups[tx_type].push(tx);
    return groups;
  }, {} as Record<string, RawTransaction[]>);
}
