import { describe, it, expect } from "vitest";
import { getErrorMessage, isAbortError } from "../../apps/web/lib/errors";

describe("error helpers", () => {
  it("getErrorMessage returns Error.message", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("getErrorMessage returns string directly", () => {
    expect(getErrorMessage("oops")).toBe("oops");
  });

  it("getErrorMessage returns fallback for unknown", () => {
    expect(getErrorMessage(null)).toBe("An unknown error occurred");
  });

  it("isAbortError detects DOMException AbortError", () => {
    const err = new DOMException("", "AbortError");
    expect(isAbortError(err)).toBe(true);
  });

  it("isAbortError rejects non-abort errors", () => {
    expect(isAbortError(new Error("boom"))).toBe(false);
  });
});
