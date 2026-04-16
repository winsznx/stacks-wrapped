export const TX_TYPES = {
  contractCall: "contract_call",
  tokenTransfer: "token_transfer",
  smartContract: "smart_contract",
  coinbase: "coinbase",
  poisonMicroblock: "poison_microblock",
} as const;

export type TxType = typeof TX_TYPES[keyof typeof TX_TYPES];
