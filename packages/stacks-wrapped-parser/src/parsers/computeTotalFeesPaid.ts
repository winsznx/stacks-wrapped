import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";

export function computeTotalFeesPaid(txs: RawTransaction[]): number {
  return txs.reduce((sum, tx) => sum + microToSTX(tx.fee_rate), 0);
}
