import { RawTransaction } from "../types";
import { isContractCall } from "../guards/isContractCall";

export function computeContractCallCount(txs: RawTransaction[]): number {
  return txs.filter(isContractCall).length;
}
