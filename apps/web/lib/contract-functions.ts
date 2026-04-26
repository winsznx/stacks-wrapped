import { PostConditionMode } from "@stacks/transactions";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { STACKS_NETWORK, HIRO_API_BASE } from "./constants";

export const getNetwork = () => {
  const network = STACKS_NETWORK === "mainnet" ? new StacksMainnet() : new StacksTestnet();
  network.client.baseUrl = HIRO_API_BASE;
  return network;
};

export const getDefaultOptions = () => ({
  network: getNetwork(),
  postConditionMode: PostConditionMode.Deny,
});
