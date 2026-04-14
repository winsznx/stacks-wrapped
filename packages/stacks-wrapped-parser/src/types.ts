export interface RawTransaction {
  tx_id: string;
  tx_type: string;
  tx_status: string;
  burn_block_time_iso: string;
  fee_rate: string;
  sender_address: string;
  nonce: number;
  block_height: number;
  token_transfer?: {
    recipient_address: string;
    amount: string;
  };
  contract_call?: {
    contract_id: string;
    function_name: string;
  };
}

export interface WrappedStats {
  totalTransactions: number;
  totalFeesPaidSTX: number;
  firstTransactionDate: string;
  favoriteContract: string;
  biggestSTXTransferSTX: number;
}
