import { fetchCallReadOnlyFunction, cvToJSON } from "@stacks/transactions";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { CONTRACT_DEPLOYER, CONTRACT_NAME, STACKS_NETWORK, HIRO_API_BASE } from "./constants";

const getNetwork = () =>
  STACKS_NETWORK === "mainnet"
    ? new StacksMainnet({ url: HIRO_API_BASE })
    : new StacksTestnet({ url: HIRO_API_BASE });

const network = getNetwork();

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
