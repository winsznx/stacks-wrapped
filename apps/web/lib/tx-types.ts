import { TransactionVersion } from "@stacks/transactions";

export enum TransactionStatus {
  SUCCESS = "success",
  PENDING = "pending",
  FAILED = "failed",
}

export const getTxVersion = (network: string) => 
  network === "mainnet" ? TransactionVersion.Mainnet : TransactionVersion.Testnet;

// Aligned with v7 transaction types
