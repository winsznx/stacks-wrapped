import { RawTransaction } from "../types";
import { isContractCall } from "../guards/isContractCall";

export function computeContractCallCount(txs: RawTransaction[]): number {
  return txs.filter((tx) => isContractCall(tx) && tx.tx_status === "success").length;
}
