import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";
import { isTokenTransfer } from "../guards/isTokenTransfer";

export function computeBiggestSTXTransfer(txs: RawTransaction[]): number {
  const amounts = txs
    .filter(isTokenTransfer)
    .map((tx) => microToSTX(tx.token_transfer.amount));
    
  if (amounts.length === 0) return 0;
  return Math.max(...amounts);
}
