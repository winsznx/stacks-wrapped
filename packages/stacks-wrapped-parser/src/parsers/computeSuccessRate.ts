import { RawTransaction } from "../types";

export function computeSuccessRate(txs: RawTransaction[]): number {
  if (txs.length === 0) return 100;
  const successful = txs.filter((tx) => tx.tx_status === "success").length;
  return parseFloat(((successful / txs.length) * 100).toFixed(2));
}
