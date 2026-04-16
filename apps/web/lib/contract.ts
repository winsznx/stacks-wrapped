export interface ParsedContractId {
  address: string;
  name: string;
}

export function parseContractId(contractId: string): ParsedContractId | null {
  const parts = contractId.split(".");
  if (parts.length !== 2) return null;
  const [address, name] = parts;
  if (!address || !name) return null;
  return { address, name };
}

export function buildContractId(address: string, name: string): string {
  return `${address}.${name}`;
}

export function isValidContractId(contractId: string): boolean {
  return parseContractId(contractId) !== null;
}
