import { describe, it, expect } from "vitest";
import { isTokenTransfer } from "../../packages/stacks-wrapped-parser/src/guards/isTokenTransfer";
import type { RawTransaction } from "../../packages/stacks-wrapped-parser/src/types";

const base: RawTransaction = {
  tx_id: "0x01",
  tx_type: "contract_call",
  tx_status: "success",
  burn_block_time_iso: "2026-01-01T00:00:00Z",
  fee_rate: "1000",
  sender_address: "SP123",
  nonce: 0,
  block_height: 1,
};

describe("isTokenTransfer", () => {
  it("returns false for contract call", () => {
    expect(isTokenTransfer(base)).toBe(false);
  });

  it("returns true for token_transfer with transfer data", () => {
    const tx = { ...base, tx_type: "token_transfer", token_transfer: { recipient_address: "SP", amount: "1" } };
    expect(isTokenTransfer(tx)).toBe(true);
  });
});
