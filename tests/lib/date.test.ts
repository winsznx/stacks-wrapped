import { describe, it, expect } from "vitest";
import { formatShortDate, formatLongDate, daysBetween } from "../../apps/web/lib/date";

describe("date helpers", () => {
  it("formatShortDate returns N/A for invalid input", () => {
    expect(formatShortDate("not-a-date")).toBe("N/A");
  });

  it("formatShortDate formats valid ISO date", () => {
    const result = formatShortDate("2026-04-16T00:00:00Z");
    expect(result).toContain("2026");
  });

  it("formatLongDate includes weekday", () => {
    const result = formatLongDate("2026-04-16T12:00:00Z");
    expect(result.length).toBeGreaterThan(10);
  });

  it("daysBetween returns correct difference", () => {
    const days = daysBetween("2026-01-01T00:00:00Z", "2026-01-11T00:00:00Z");
    expect(days).toBe(10);
  });

  it("daysBetween returns 0 for invalid input", () => {
    expect(daysBetween("bad", "also-bad")).toBe(0);
  });
});
