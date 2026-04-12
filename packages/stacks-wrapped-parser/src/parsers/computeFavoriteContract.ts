import { RawTransaction } from "../types";

export function computeFavoriteContract(txs: RawTransaction[]): string {
  const contractCalls = txs.filter(
    (tx) => tx.tx_type === "contract_call" && tx.contract_call
  );

  if (contractCalls.length === 0) return "None";

  const counts = new Map<string, number>();
  for (const tx of contractCalls) {
    const contractId = tx.contract_call!.contract_id;
    counts.set(contractId, (counts.get(contractId) ?? 0) + 1);
  }

  let maxId = "";
  let maxCount = 0;
  for (const [id, count] of counts) {
    if (count > maxCount) {
      maxId = id;
      maxCount = count;
    }
  }

  return maxId;
}
