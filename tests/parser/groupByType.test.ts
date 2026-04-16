import { describe, it, expect } from "vitest";
import { groupByType } from "../../packages/stacks-wrapped-parser/src/parsers/groupByType";
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
  };
}

describe("groupByType", () => {
  it("returns empty object for empty input", () => {
    expect(groupByType([])).toEqual({});
  });

  it("groups transactions by tx_type", () => {
    const result = groupByType([makeTx("a"), makeTx("b"), makeTx("a")]);
    expect(result.a).toHaveLength(2);
    expect(result.b).toHaveLength(1);
  });
});
