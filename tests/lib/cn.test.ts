import { describe, it, expect } from "vitest";
import { cn } from "../../apps/web/lib/cn";

describe("cn", () => {
  it("joins classes with spaces", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("returns empty string for no truthy values", () => {
    expect(cn(false, null)).toBe("");
  });
});
