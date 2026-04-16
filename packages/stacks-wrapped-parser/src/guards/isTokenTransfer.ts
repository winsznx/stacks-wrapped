import { RawTransaction } from "../types";

export function isTokenTransfer(
  tx: RawTransaction
): tx is RawTransaction & { token_transfer: NonNullable<RawTransaction["token_transfer"]> } {
  return tx.tx_type === "token_transfer" && tx.token_transfer !== undefined;
}
