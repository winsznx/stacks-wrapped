import { RawTransaction } from "../types";

export function isValidTransaction(value: unknown): value is RawTransaction {
  if (typeof value !== "object" || value === null) return false;
  const tx = value as Record<string, unknown>;
  return (
    typeof tx.tx_id === "string" &&
    typeof tx.tx_type === "string" &&
    typeof tx.burn_block_time_iso === "string" &&
    typeof tx.fee_rate === "string" &&
    typeof tx.sender_address === "string"
  );
}
