import { describe, it, expect } from "vitest";
import { formatSTX } from "../../packages/stacks-wrapped-parser/src/utils/microToSTX";

describe("formatSTX", () => {
  it("formats integer values with two decimal places", () => {
    expect(formatSTX(1)).toBe("1.00");
  });

  it("includes thousands separators", () => {
    expect(formatSTX(1234567.89)).toBe("1,234,567.89");
  });

  it("caps at six decimal places", () => {
    expect(formatSTX(0.1234567)).toBe("0.123457");
  });
});
