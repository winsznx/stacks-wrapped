import { describe, it, expect } from "vitest";
import { computeContractCallCount } from "../../packages/stacks-wrapped-parser/src/parsers/computeContractCallCount";
import type { RawTransaction } from "../../packages/stacks-wrapped-parser/src/types";

function makeTx(overrides: Partial<RawTransaction>): RawTransaction {
  return {
    tx_id: "0x01",
    tx_type: "contract_call",
    tx_status: "success",
    burn_block_time_iso: "2026-01-01T00:00:00Z",
    fee_rate: "1000",
    sender_address: "SP123",
    nonce: 0,
    block_height: 1,
    contract_call: { contract_id: "SP.c", function_name: "f" },
    ...overrides,
  };
}

describe("computeContractCallCount", () => {
  it("returns 0 for empty array", () => {
    expect(computeContractCallCount([])).toBe(0);
  });

  it("counts only contract_call transactions", () => {
    const txs = [
      makeTx({}),
      makeTx({ tx_type: "token_transfer", contract_call: undefined }),
      makeTx({}),
    ];
    expect(computeContractCallCount(txs)).toBe(2);
  });
});
