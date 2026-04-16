const MAINNET_PREFIXES = ["SP", "SM"] as const;
const TESTNET_PREFIXES = ["ST", "SN"] as const;

export function isValidMainnetAddress(address: string): boolean {
  if (typeof address !== "string") return false;
  const trimmed = address.trim();
  if (trimmed.length < 28 || trimmed.length > 41) return false;
  return MAINNET_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
}

export function isValidTestnetAddress(address: string): boolean {
  if (typeof address !== "string") return false;
  const trimmed = address.trim();
  if (trimmed.length < 28 || trimmed.length > 41) return false;
  return TESTNET_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
}

export function isValidStacksAddress(address: string): boolean {
  return isValidMainnetAddress(address) || isValidTestnetAddress(address);
}
