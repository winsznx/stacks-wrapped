import { describe, it, expect } from "vitest";
import { buildWrappedUrl, buildLeaderboardUrl, buildHiroExplorerUrl, buildHiroAddressUrl } from "../../apps/web/lib/url";

describe("url builders", () => {
  it("buildWrappedUrl with no address returns plain path", () => {
    const url = buildWrappedUrl();
    expect(url.endsWith("/wrapped")).toBe(true);
  });

  it("buildWrappedUrl encodes address", () => {
    const url = buildWrappedUrl("SP 1");
    expect(url).toContain("SP%201");
  });

  it("buildLeaderboardUrl ends with leaderboard path", () => {
    expect(buildLeaderboardUrl().endsWith("/leaderboard")).toBe(true);
  });

  it("buildHiroExplorerUrl includes txId", () => {
    expect(buildHiroExplorerUrl("0xabc")).toContain("0xabc");
  });

  it("buildHiroAddressUrl includes address", () => {
    expect(buildHiroAddressUrl("SP123")).toContain("SP123");
  });
});
