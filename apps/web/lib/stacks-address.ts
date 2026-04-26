import { validateStacksAddress } from "@stacks/transactions";

/**
 * Validates a Stacks address using v7 transactions utility.
 * @param address - The address to validate.
 * @returns boolean indicating if the address is valid.
 */
export function isValidAddress(address: string): boolean {
  if (!address) return false;
  return validateStacksAddress(address);
}

/** Alias used by components */
export const isValidStacksAddress = isValidAddress;

export function truncateAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
