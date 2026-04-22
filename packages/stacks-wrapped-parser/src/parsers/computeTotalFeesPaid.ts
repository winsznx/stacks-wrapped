import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";

export function computeTotalFeesPaid(txs: RawTransaction[]): number {
  const total = txs.reduce((sum, tx) => sum + microToSTX(tx.fee_rate), 0);
  // Using toFixed and parseFloat to handle common JS floating point issues
  return parseFloat(total.toFixed(6));
}
