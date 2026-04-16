import { describe, it, expect } from "vitest";
import { formatCompact, formatInteger, formatDecimal, clamp } from "../../apps/web/lib/numbers";

describe("number helpers", () => {
  it("formatCompact uses compact notation", () => {
    expect(formatCompact(1500)).toBe("1.5K");
  });

  it("formatInteger rounds and formats", () => {
    expect(formatInteger(1234.7)).toBe("1,235");
  });

  it("formatDecimal respects fraction digits", () => {
    expect(formatDecimal(1.5, 3)).toBe("1.500");
  });

  it("clamp constrains value to bounds", () => {
    expect(clamp(10, 0, 5)).toBe(5);
    expect(clamp(-5, 0, 5)).toBe(0);
    expect(clamp(3, 0, 5)).toBe(3);
  });
});
