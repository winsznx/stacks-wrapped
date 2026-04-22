import { RawTransaction } from "../types";

/**
 * Type guard to determine if a transaction is a contract call.
 * Checks both the `tx_type` field and the presence of `contract_call` data.
 *
 * @param tx - The raw transaction to check.
 * @returns True if the transaction is a contract call with valid data.
 */
export function isContractCall(
  tx: RawTransaction
): tx is RawTransaction & { contract_call: NonNullable<RawTransaction["contract_call"]> } {
  return tx.tx_type === "contract_call" && !!tx.contract_call;
}
