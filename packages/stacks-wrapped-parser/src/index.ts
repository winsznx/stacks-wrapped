export { RawTransaction, WrappedStats } from "./types";
export { microToSTX, formatSTX } from "./utils/microToSTX";
export { computeTotalTransactions } from "./parsers/computeTotalTransactions";
export { computeTotalFeesPaid } from "./parsers/computeTotalFeesPaid";
export { computeFirstTransactionDate } from "./parsers/computeFirstTransactionDate";
export { computeFavoriteContract } from "./parsers/computeFavoriteContract";
export { computeBiggestSTXTransfer } from "./parsers/computeBiggestSTXTransfer";

import { RawTransaction, WrappedStats } from "./types";
import { computeTotalTransactions } from "./parsers/computeTotalTransactions";
import { computeTotalFeesPaid } from "./parsers/computeTotalFeesPaid";
import { computeFirstTransactionDate } from "./parsers/computeFirstTransactionDate";
import { computeFavoriteContract } from "./parsers/computeFavoriteContract";
import { computeBiggestSTXTransfer } from "./parsers/computeBiggestSTXTransfer";

export function computeWrappedStats(txs: RawTransaction[]): WrappedStats {
  return {
    totalTransactions: computeTotalTransactions(txs),
    totalFeesPaidSTX: computeTotalFeesPaid(txs),
    firstTransactionDate: computeFirstTransactionDate(txs),
    favoriteContract: computeFavoriteContract(txs),
    biggestSTXTransferSTX: computeBiggestSTXTransfer(txs),
  };
}
