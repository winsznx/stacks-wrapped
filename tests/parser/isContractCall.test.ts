import { describe, it, expect } from "vitest";
import { isContractCall } from "../../packages/stacks-wrapped-parser/src/guards/isContractCall";
import type { RawTransaction } from "../../packages/stacks-wrapped-parser/src/types";

const base: RawTransaction = {
  tx_id: "0x01",
  tx_type: "token_transfer",
  tx_status: "success",
  burn_block_time_iso: "2026-01-01T00:00:00Z",
  fee_rate: "1000",
  sender_address: "SP123",
  nonce: 0,
  block_height: 1,
};

describe("isContractCall", () => {
  it("returns false for token transfer", () => {
    expect(isContractCall(base)).toBe(false);
  });

  it("returns true when tx_type is contract_call with data", () => {
    const tx = { ...base, tx_type: "contract_call", contract_call: { contract_id: "a.b", function_name: "f" } };
    expect(isContractCall(tx)).toBe(true);
  });
});
