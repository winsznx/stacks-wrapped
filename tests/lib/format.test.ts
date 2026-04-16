import { describe, it, expect } from "vitest";
import { truncateAddress, truncateContract } from "../../apps/web/lib/format";

describe("format helpers", () => {
  it("truncateAddress returns short addresses unchanged", () => {
    expect(truncateAddress("SP123")).toBe("SP123");
  });

  it("truncateAddress truncates long addresses", () => {
    expect(truncateAddress("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR"))
      .toBe("SP2J6Z...6DPR");
  });

  it("truncateContract returns short contracts unchanged", () => {
    expect(truncateContract("a.b")).toBe("a.b");
  });

  it("truncateContract truncates long contracts", () => {
    const long = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR.very-long-contract-name";
    expect(truncateContract(long)).toHaveLength(31);
  });
});
