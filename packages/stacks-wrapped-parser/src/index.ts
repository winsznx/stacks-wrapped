export { RawTransaction, WrappedStats } from "./types";
export { microToSTX, formatSTX } from "./utils/microToSTX";
export { isValidTransaction } from "./utils/validateTransaction";
export { isContractCall } from "./guards/isContractCall";
export { isTokenTransfer } from "./guards/isTokenTransfer";
export { computeTotalTransactions } from "./parsers/computeTotalTransactions";
export { computeTotalFeesPaid } from "./parsers/computeTotalFeesPaid";
export { computeFirstTransactionDate } from "./parsers/computeFirstTransactionDate";
export { computeFavoriteContract } from "./parsers/computeFavoriteContract";
export { computeBiggestSTXTransfer } from "./parsers/computeBiggestSTXTransfer";
export { computeContractCallCount } from "./parsers/computeContractCallCount";
export { computeUniqueContractsCount } from "./parsers/computeUniqueContractsCount";
export { computeAverageFee } from "./parsers/computeAverageFee";
export { computeSuccessRate } from "./parsers/computeSuccessRate";
export { computeTokenTransferCount } from "./parsers/computeTokenTransferCount";
export { groupByType } from "./parsers/groupByType";

import { RawTransaction, WrappedStats } from "./types";
import { computeTotalTransactions } from "./parsers/computeTotalTransactions";
import { computeTotalFeesPaid } from "./parsers/computeTotalFeesPaid";
import { computeFirstTransactionDate } from "./parsers/computeFirstTransactionDate";
import { computeFavoriteContract } from "./parsers/computeFavoriteContract";
import { computeBiggestSTXTransfer } from "./parsers/computeBiggestSTXTransfer";
import { computeContractCallCount } from "./parsers/computeContractCallCount";
import { computeUniqueContractsCount } from "./parsers/computeUniqueContractsCount";
import { computeAverageFee } from "./parsers/computeAverageFee";
import { computeSuccessRate } from "./parsers/computeSuccessRate";
import { computeTokenTransferCount } from "./parsers/computeTokenTransferCount";

export function computeWrappedStats(txs: RawTransaction[]): WrappedStats {
  return {
    totalTransactions: computeTotalTransactions(txs),
    totalFeesPaidSTX: computeTotalFeesPaid(txs),
    firstTransactionDate: computeFirstTransactionDate(txs),
    favoriteContract: computeFavoriteContract(txs),
    biggestSTXTransferSTX: computeBiggestSTXTransfer(txs),
    contractCallCount: computeContractCallCount(txs),
    uniqueContractsCount: computeUniqueContractsCount(txs),
    averageFeeSTX: computeAverageFee(txs),
    successRate: computeSuccessRate(txs),
    tokenTransferCount: computeTokenTransferCount(txs),
  };
}
