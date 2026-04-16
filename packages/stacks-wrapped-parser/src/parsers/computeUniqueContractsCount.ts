import { RawTransaction } from "../types";
import { isContractCall } from "../guards/isContractCall";

export function computeUniqueContractsCount(txs: RawTransaction[]): number {
  const unique = new Set<string>();
  for (const tx of txs) {
    if (isContractCall(tx)) {
      unique.add(tx.contract_call.contract_id);
    }
  }
  return unique.size;
}
