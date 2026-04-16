import { describe, it, expect } from "vitest";
import { isValidTransaction } from "../../packages/stacks-wrapped-parser/src/utils/validateTransaction";

describe("isValidTransaction", () => {
  it("returns false for null", () => {
    expect(isValidTransaction(null)).toBe(false);
  });

  it("returns false for missing required fields", () => {
    expect(isValidTransaction({ tx_id: "0x01" })).toBe(false);
  });

  it("returns true for valid transaction shape", () => {
    const valid = {
      tx_id: "0x01",
      tx_type: "token_transfer",
      burn_block_time_iso: "2026-01-01",
      fee_rate: "1000",
      sender_address: "SP",
    };
    expect(isValidTransaction(valid)).toBe(true);
  });
});
