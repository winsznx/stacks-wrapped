import { PostConditionMode } from "@stacks/transactions";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { STACKS_NETWORK } from "./constants";

export const getNetwork = () => 
  STACKS_NETWORK === "mainnet" ? new StacksMainnet() : new StacksTestnet();

export const getDefaultOptions = () => ({
  network: getNetwork(),
  postConditionMode: PostConditionMode.Deny,
});
