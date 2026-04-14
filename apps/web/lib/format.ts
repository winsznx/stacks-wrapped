export function truncateAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function truncateContract(contractId: string, maxLen: number = 28): string {
  if (contractId.length <= maxLen) return contractId;
  return contractId.slice(0, maxLen) + "...";
}
