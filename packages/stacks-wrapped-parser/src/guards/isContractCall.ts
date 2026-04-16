import { RawTransaction } from "../types";

export function isContractCall(
  tx: RawTransaction
): tx is RawTransaction & { contract_call: NonNullable<RawTransaction["contract_call"]> } {
  return tx.tx_type === "contract_call" && tx.contract_call !== undefined;
}
