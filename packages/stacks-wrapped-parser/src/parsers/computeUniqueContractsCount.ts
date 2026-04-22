import { RawTransaction } from "../types";
import { isContractCall } from "../guards/isContractCall";

export function computeUniqueContractsCount(txs: RawTransaction[]): number {
  const contracts = new Set<string>();
  for (const tx of txs) {
    if (isContractCall(tx)) {
      contracts.add(tx.contract_call.contract_id);
    }
  }
  return contracts.size;
}
