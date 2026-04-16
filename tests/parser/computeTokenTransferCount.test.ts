import { describe, it, expect } from "vitest";
import { computeTokenTransferCount } from "../../packages/stacks-wrapped-parser/src/parsers/computeTokenTransferCount";
import type { RawTransaction } from "../../packages/stacks-wrapped-parser/src/types";

function makeTx(type: string): RawTransaction {
  return {
    tx_id: "0x01",
    tx_type: type,
    tx_status: "success",
    burn_block_time_iso: "2026-01-01T00:00:00Z",
    fee_rate: "1000",
    sender_address: "SP123",
    nonce: 0,
    block_height: 1,
    token_transfer: type === "token_transfer" ? { recipient_address: "SP", amount: "1" } : undefined,
  };
}

describe("computeTokenTransferCount", () => {
  it("returns 0 for empty input", () => {
    expect(computeTokenTransferCount([])).toBe(0);
  });

  it("counts only token_transfer transactions", () => {
    const txs = [makeTx("token_transfer"), makeTx("contract_call"), makeTx("token_transfer")];
    expect(computeTokenTransferCount(txs)).toBe(2);
  });
});
