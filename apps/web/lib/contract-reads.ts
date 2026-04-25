import { callReadOnlyFunction, cvToJSON, cvToValue, uintCV, principalCV } from "@stacks/transactions";
import { CONTRACT_DEPLOYER, CONTRACT_NAME, STACKS_NETWORK, HIRO_API_BASE } from "./constants";

const network = STACKS_NETWORK === "mainnet" ? "mainnet" : "testnet";

export async function getRegistryData(address: string) {
  try {
    const response = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_DEPLOYER,
      contractName: CONTRACT_NAME,
      functionName: "get-user-data",
      functionArgs: [],
      network,
      senderAddress: address,
    });
    return cvToJSON(response);
  } catch (error) {
    console.error("Error fetching registry data:", error);
    return null;
  }
}

export async function hasClaimed(address: string): Promise<boolean> {
  try {
    const response = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_DEPLOYER,
      contractName: CONTRACT_NAME,
      functionName: "has-claimed",
      functionArgs: [principalCV(address)],
      network,
      senderAddress: address,
    });
    return cvToValue(response) === true;
  } catch {
    return false;
  }
}

export async function getTotalWrapped(): Promise<number> {
  try {
    const response = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_DEPLOYER,
      contractName: CONTRACT_NAME,
      functionName: "get-total-wrapped",
      functionArgs: [],
      network,
      senderAddress: CONTRACT_DEPLOYER,
    });
    const val = cvToValue(response);
    return typeof val === "number" ? val : Number(val) || 0;
  } catch {
    return 0;
  }
}
