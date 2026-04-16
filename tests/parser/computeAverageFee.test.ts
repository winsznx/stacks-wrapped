import { describe, it, expect } from "vitest";
import { computeAverageFee } from "../../packages/stacks-wrapped-parser/src/parsers/computeAverageFee";
import type { RawTransaction } from "../../packages/stacks-wrapped-parser/src/types";

function makeTx(fee: string): RawTransaction {
  return {
    tx_id: "0x01",
    tx_type: "token_transfer",
    tx_status: "success",
    burn_block_time_iso: "2026-01-01T00:00:00Z",
    fee_rate: fee,
    sender_address: "SP123",
    nonce: 0,
    block_height: 1,
  };
}

describe("computeAverageFee", () => {
  it("returns 0 for empty array", () => {
    expect(computeAverageFee([])).toBe(0);
  });

  it("returns average in STX", () => {
    const txs = [makeTx("1000000"), makeTx("2000000"), makeTx("3000000")];
    expect(computeAverageFee(txs)).toBe(2);
  });
});
