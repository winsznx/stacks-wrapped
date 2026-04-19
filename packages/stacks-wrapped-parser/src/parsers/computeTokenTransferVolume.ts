import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";
import { isTokenTransfer } from "../guards/isTokenTransfer";

export function computeTokenTransferVolume(txs: RawTransaction[]): number {
  return txs.reduce((total, tx) => {
    if (isTokenTransfer(tx)) {
      return total + microToSTX(tx.token_transfer.amount);
    }
    return total;
  }, 0);
}
