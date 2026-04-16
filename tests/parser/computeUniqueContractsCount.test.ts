import { describe, it, expect } from "vitest";
import { computeUniqueContractsCount } from "../../packages/stacks-wrapped-parser/src/parsers/computeUniqueContractsCount";
import type { RawTransaction } from "../../packages/stacks-wrapped-parser/src/types";

function makeTx(contractId: string): RawTransaction {
  return {
    tx_id: "0x01",
    tx_type: "contract_call",
    tx_status: "success",
    burn_block_time_iso: "2026-01-01T00:00:00Z",
    fee_rate: "1000",
    sender_address: "SP123",
    nonce: 0,
    block_height: 1,
    contract_call: { contract_id: contractId, function_name: "f" },
  };
}

describe("computeUniqueContractsCount", () => {
  it("returns 0 for empty array", () => {
    expect(computeUniqueContractsCount([])).toBe(0);
  });

  it("counts distinct contract ids", () => {
    const txs = [makeTx("a.c1"), makeTx("a.c2"), makeTx("a.c1")];
    expect(computeUniqueContractsCount(txs)).toBe(2);
  });
});
