import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";

export function computeAverageFee(txs: RawTransaction[]): number {
  if (txs.length === 0) return 0;
  const total = txs.reduce((sum, tx) => sum + microToSTX(tx.fee_rate), 0);
  return Math.round((total / txs.length) * 1_000_000) / 1_000_000;
}
