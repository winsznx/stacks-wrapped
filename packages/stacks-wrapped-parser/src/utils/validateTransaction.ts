import { RawTransaction } from "../types";

/**
 * Validates if an unknown value matches the RawTransaction interface.
 * This is used to ensure API responses match our expected data structure.
 *
 * @param value - The value to validate.
 * @returns True if the value is a valid RawTransaction.
 */
export function isValidTransaction(value: unknown): value is RawTransaction {
  if (typeof value !== "object" || value === null) return false;
  const tx = value as Record<string, unknown>;
  return (
    typeof tx.tx_id === "string" &&
    typeof tx.tx_type === "string" &&
    typeof tx.tx_status === "string" &&
    typeof tx.burn_block_time_iso === "string" &&
    typeof tx.fee_rate === "string" &&
    typeof tx.sender_address === "string" &&
    typeof tx.nonce === "number" &&
    typeof tx.block_height === "number"
  );
}
