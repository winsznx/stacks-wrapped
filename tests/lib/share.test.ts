import { describe, it, expect } from "vitest";
import { buildShareText, buildTweetUrl } from "../../apps/web/lib/share";

const stats = {
  totalTransactions: 42,
  totalFeesPaidSTX: 1.23,
  firstTransactionDate: "2026-01-01T00:00:00Z",
  favoriteContract: "SP.c",
  biggestSTXTransferSTX: 100,
};

describe("share builders", () => {
  it("buildShareText includes transaction count", () => {
    expect(buildShareText(stats)).toContain("42 txs");
  });

  it("buildShareText includes fee total", () => {
    expect(buildShareText(stats)).toContain("1.23 STX");
  });

  it("buildTweetUrl encodes text", () => {
    const url = buildTweetUrl("hello world");
    expect(url).toContain("hello%20world");
  });
});
