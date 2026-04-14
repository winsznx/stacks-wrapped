import {
  callReadOnlyFunction,
  cvToValue,
  standardPrincipalCV,
  ClarityType,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { CONTRACT_DEPLOYER, CONTRACT_NAME } from "./constants";

const network = new StacksMainnet();

export async function getTotalWrapped(): Promise<number> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: "get-total-wrapped",
    functionArgs: [],
    network,
    senderAddress: CONTRACT_DEPLOYER,
  });

  if (result.type === ClarityType.ResponseOk) {
    return Number(cvToValue(result.value));
  }

  throw new Error("Unexpected response from get-total-wrapped");
}

export async function hasClaimed(address: string): Promise<boolean> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: "has-claimed",
    functionArgs: [standardPrincipalCV(address)],
    network,
    senderAddress: CONTRACT_DEPLOYER,
  });

  if (result.type === ClarityType.ResponseOk) {
    return Boolean(cvToValue(result.value));
  }

  throw new Error("Unexpected response from has-claimed");
}
