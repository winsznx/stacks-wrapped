import { RawTransaction } from "../types";
import { isContractCall } from "../guards/isContractCall";

/**
 * Determines the contract the user interacted with most frequently.
 * Ties are broken by alphabetical order of the contract identifier.
 *
 * @param txs - Array of raw transactions.
 * @returns The identifier of the most frequent contract, or "None" if no contract calls found.
 */
export function computeFavoriteContract(txs: RawTransaction[]): string {
  if (!Array.isArray(txs)) return "None";

  const counts = new Map<string, number>();

  for (const tx of txs) {
    if (isContractCall(tx)) {
      const { contract_id } = tx.contract_call;
      counts.set(contract_id, (counts.get(contract_id) ?? 0) + 1);
    }
  }

  if (counts.size === 0) return "None";

  return Array.from(counts.entries()).reduce((favorite, [id, count]) => {
    if (count > favorite.count || (count === favorite.count && id < favorite.id)) {
      return { id, count };
    }
    return favorite;
  }, { id: "", count: -1 }).id;
}
