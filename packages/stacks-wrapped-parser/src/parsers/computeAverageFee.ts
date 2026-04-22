import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";

export function computeAverageFee(txs: RawTransaction[]): number {
  if (txs.length === 0) return 0;
  const total = txs.reduce((sum, tx) => sum + microToSTX(tx.fee_rate), 0);
  const average = total / txs.length;
  return parseFloat(average.toFixed(6));
}
