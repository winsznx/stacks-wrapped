import { describe, it, expect } from "vitest";
import {
  isValidMainnetAddress,
  isValidTestnetAddress,
  isValidStacksAddress,
} from "../../apps/web/lib/stacks-address";

describe("stacks-address", () => {
  it("accepts valid SP mainnet address", () => {
    expect(isValidMainnetAddress("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR")).toBe(true);
  });

  it("rejects ST prefix as mainnet", () => {
    expect(isValidMainnetAddress("ST2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR")).toBe(false);
  });

  it("accepts valid ST testnet address", () => {
    expect(isValidTestnetAddress("ST2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR")).toBe(true);
  });

  it("isValidStacksAddress accepts either", () => {
    expect(isValidStacksAddress("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR")).toBe(true);
    expect(isValidStacksAddress("ST2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR")).toBe(true);
  });

  it("rejects non-string input", () => {
    expect(isValidStacksAddress(123 as unknown as string)).toBe(false);
  });

  it("rejects too-short address", () => {
    expect(isValidStacksAddress("SP123")).toBe(false);
  });
});
