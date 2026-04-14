import { describe, it, expect } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

interface ClarityValue {
  type: string;
  value: bigint | boolean | string | ClarityValue | Record<string, ClarityValue>;
}

function cv(result: unknown): ClarityValue {
  return result as ClarityValue;
}

describe("wrapped-registry", () => {
  it("starts with zero total wrapped", () => {
    const r = cv(simnet.callReadOnlyFn("wrapped-registry", "get-total-wrapped", [], deployer).result);
    expect(r.type).toBe("ok");
    expect((r.value as ClarityValue).value).toBe(0n);
  });

  it("allows a user to claim a wrapped card", () => {
    const r = cv(simnet.callPublicFn("wrapped-registry", "claim-wrapped-card", [], wallet1).result);
    expect(r.type).toBe("ok");
    expect((r.value as ClarityValue).type).toBe("true");
  });

  it("increments total wrapped after a claim", () => {
    simnet.callPublicFn("wrapped-registry", "claim-wrapped-card", [], wallet1);
    const r = cv(simnet.callReadOnlyFn("wrapped-registry", "get-total-wrapped", [], deployer).result);
    expect(r.type).toBe("ok");
    expect((r.value as ClarityValue).value).toBe(1n);
  });

  it("rejects duplicate claims with err u100", () => {
    simnet.callPublicFn("wrapped-registry", "claim-wrapped-card", [], wallet1);
    const r = cv(simnet.callPublicFn("wrapped-registry", "claim-wrapped-card", [], wallet1).result);
    expect(r.type).toBe("err");
    expect((r.value as ClarityValue).value).toBe(100n);
  });

  it("tracks multiple independent claimers", () => {
    simnet.callPublicFn("wrapped-registry", "claim-wrapped-card", [], wallet1);
    simnet.callPublicFn("wrapped-registry", "claim-wrapped-card", [], wallet2);
    const r = cv(simnet.callReadOnlyFn("wrapped-registry", "get-total-wrapped", [], deployer).result);
    expect(r.type).toBe("ok");
    expect((r.value as ClarityValue).value).toBe(2n);
  });
});
