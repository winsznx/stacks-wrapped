import { RawTransaction } from "../types";

/**
 * Type guard to determine if a transaction is a token transfer.
 * Checks both the `tx_type` field and the presence of `token_transfer` data.
 *
 * @param tx - The raw transaction to check.
 * @returns True if the transaction is a token transfer with valid data.
 */
export function isTokenTransfer(
  tx: RawTransaction
): tx is RawTransaction & { token_transfer: NonNullable<RawTransaction["token_transfer"]> } {
  return tx.tx_type === "token_transfer" && !!tx.token_transfer;
}
