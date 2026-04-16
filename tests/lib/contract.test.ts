import { describe, it, expect } from "vitest";
import { parseContractId, buildContractId, isValidContractId } from "../../apps/web/lib/contract";

describe("contract helpers", () => {
  it("parseContractId splits valid id", () => {
    expect(parseContractId("SP123.my-contract")).toEqual({ address: "SP123", name: "my-contract" });
  });

  it("parseContractId returns null for invalid input", () => {
    expect(parseContractId("no-dot")).toBeNull();
    expect(parseContractId(".missing-address")).toBeNull();
    expect(parseContractId("missing-name.")).toBeNull();
  });

  it("buildContractId joins address and name", () => {
    expect(buildContractId("SP", "name")).toBe("SP.name");
  });

  it("isValidContractId returns boolean", () => {
    expect(isValidContractId("SP.c")).toBe(true);
    expect(isValidContractId("x")).toBe(false);
  });
});
