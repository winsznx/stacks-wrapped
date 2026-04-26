import { PostConditionMode } from "@stacks/transactions";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { STACKS_NETWORK, HIRO_API_BASE } from "./constants";

export const getNetwork = () => {
  const url = HIRO_API_BASE;
  return STACKS_NETWORK === "mainnet"
    ? new StacksMainnet({ url })
    : new StacksTestnet({ url });
};

export const getDefaultOptions = () => ({
  network: getNetwork(),
  postConditionMode: PostConditionMode.Deny,
});
