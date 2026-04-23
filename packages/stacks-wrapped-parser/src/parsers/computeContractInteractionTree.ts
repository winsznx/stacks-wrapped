import { RawTransaction } from "../types";
import { isContractCall } from "../guards/isContractCall";

export interface ContractNode {
  id: string;
  count: number;
  functions: Record<string, number>;
}

export function computeContractInteractionTree(txs: RawTransaction[]): ContractNode[] {
  const tree = new Map<string, ContractNode>();

  for (const tx of txs) {
    if (isContractCall(tx)) {
      const { contract_id, function_name } = tx.contract_call;
      const node = tree.get(contract_id) || { id: contract_id, count: 0, functions: {} };
      node.count++;
      node.functions[function_name] = (node.functions[function_name] || 0) + 1;
      tree.set(contract_id, node);
    }
  }

  return Array.from(tree.values()).sort((a, b) => b.count - a.count);
}
