import { PostConditionMode } from "@stacks/transactions";
import { STACKS_NETWORK, HIRO_API_BASE } from "./constants";

export const getNetwork = () =>
  STACKS_NETWORK === "mainnet" ? "mainnet" : "testnet";

export const getDefaultOptions = () => ({
  network: getNetwork(),
  postConditionMode: PostConditionMode.Deny,
});
