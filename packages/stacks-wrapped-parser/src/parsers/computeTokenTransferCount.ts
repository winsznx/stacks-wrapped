import { RawTransaction } from "../types";
import { isTokenTransfer } from "../guards/isTokenTransfer";

export function computeTokenTransferCount(txs: RawTransaction[]): number {
  return txs.filter(isTokenTransfer).length;
}
