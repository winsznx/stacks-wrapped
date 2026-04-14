import { RawTransaction } from "../types";
import { microToSTX } from "../utils/microToSTX";

export function computeBiggestSTXTransfer(txs: RawTransaction[]): number {
  const transfers = txs.filter(
    (tx) => tx.tx_type === "token_transfer" && tx.token_transfer
  );

  if (transfers.length === 0) return 0;

  const amounts = transfers.map((tx) => Number(tx.token_transfer!.amount));
  const validAmounts = amounts.filter((a) => !isNaN(a) && isFinite(a));

  if (validAmounts.length === 0) return 0;

  return microToSTX(Math.max(...validAmounts));
}
