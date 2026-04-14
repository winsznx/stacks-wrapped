import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";

export function computeTotalFeesPaid(txs: RawTransaction[]): number {
  const total = txs.reduce((sum, tx) => sum + microToSTX(tx.fee_rate), 0);
  return Math.round(total * 1_000_000) / 1_000_000;
}
