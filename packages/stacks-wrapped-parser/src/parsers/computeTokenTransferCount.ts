import { RawTransaction } from "../types";
import { isTokenTransfer } from "../guards/isTokenTransfer";

export function computeTokenTransferCount(txs: RawTransaction[], address?: string): { sent: number, received: number, total: number } {
  return txs.reduce((acc, tx) => {
    if (isTokenTransfer(tx)) {
      acc.total++;
      if (address) {
        if (tx.sender_address === address) acc.sent++;
        else acc.received++;
      }
    }
    return acc;
  }, { sent: 0, received: 0, total: 0 });
}
