import { fetchCallReadOnlyFunction, cvToJSON } from "@stacks/transactions";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { CONTRACT_DEPLOYER, CONTRACT_NAME, STACKS_NETWORK } from "./constants";

const network = STACKS_NETWORK === "mainnet" ? new StacksMainnet() : new StacksTestnet();

export async function getRegistryData(address: string) {
  try {
    const response = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_DEPLOYER,
      contractName: CONTRACT_NAME,
      functionName: "get-user-data",
      functionArgs: [], // Add CV args if needed
      network,
      senderAddress: address,
    });
    return cvToJSON(response);
  } catch (error) {
    console.error("Error fetching registry data:", error);
    return null;
  }
}
