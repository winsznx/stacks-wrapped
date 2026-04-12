export function microToSTX(microSTX: string | number): number {
  return Number(microSTX) / 1_000_000;
}
