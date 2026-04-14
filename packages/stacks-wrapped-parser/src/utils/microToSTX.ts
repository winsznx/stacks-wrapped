export function microToSTX(microSTX: string | number): number {
  return Number(microSTX) / 1_000_000;
}

export function formatSTX(stx: number): string {
  return stx.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}
