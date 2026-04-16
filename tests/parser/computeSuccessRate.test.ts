import { describe, it, expect } from "vitest";
import { computeSuccessRate } from "../../packages/stacks-wrapped-parser/src/parsers/computeSuccessRate";
import type { RawTransaction } from "../../packages/stacks-wrapped-parser/src/types";

function makeTx(status: string): RawTransaction {
  return {
    tx_id: "0x01",
    tx_type: "token_transfer",
    tx_status: status,
    burn_block_time_iso: "2026-01-01T00:00:00Z",
    fee_rate: "1000",
    sender_address: "SP123",
    nonce: 0,
    block_height: 1,
  };
}

describe("computeSuccessRate", () => {
  it("returns 0 for empty array", () => {
    expect(computeSuccessRate([])).toBe(0);
  });

  it("computes proportion of successful transactions", () => {
    const txs = [makeTx("success"), makeTx("abort_by_response"), makeTx("success")];
    expect(computeSuccessRate(txs)).toBeCloseTo(2 / 3);
  });
});
