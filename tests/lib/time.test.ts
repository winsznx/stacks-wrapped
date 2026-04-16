import { describe, it, expect } from "vitest";
import { blocksToMinutes, formatRelativeTime } from "../../apps/web/lib/time";

describe("time helpers", () => {
  it("blocksToMinutes multiplies by 10", () => {
    expect(blocksToMinutes(6)).toBe(60);
  });

  it("formatRelativeTime returns just now for same block", () => {
    expect(formatRelativeTime(100, 100)).toBe("just now");
  });

  it("formatRelativeTime formats minutes", () => {
    expect(formatRelativeTime(100, 103)).toBe("30 minutes ago");
  });

  it("formatRelativeTime formats hours", () => {
    expect(formatRelativeTime(100, 106)).toBe("1 hour ago");
  });

  it("formatRelativeTime formats days", () => {
    expect(formatRelativeTime(100, 244)).toContain("day");
  });
});
