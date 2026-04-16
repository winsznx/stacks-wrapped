import { RawTransaction } from "../types";

export function computeSuccessRate(txs: RawTransaction[]): number {
  if (txs.length === 0) return 0;
  const successful = txs.filter((tx) => tx.tx_status === "success").length;
  return successful / txs.length;
}
