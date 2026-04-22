/**
 * Converts micro-STX to STX units.
 *
 * @param microSTX - The amount in micro-STX (as string or number).
 * @returns The amount in STX as a number.
 */
export function microToSTX(microSTX: string | number): number {
  const value = Number(microSTX);
  if (isNaN(value) || !isFinite(value)) return 0;
  return value / 1_000_000;
}

export function formatSTX(stx: number): string {
  return stx.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}
