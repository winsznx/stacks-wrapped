/**
 * Safe conversion and formatting for Stacks numbers.
 */
export function toFixed(value: number, decimals: number = 6): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function parseMicroStx(amount: string | number): number {
  const val = typeof amount === "string" ? parseInt(amount, 10) : amount;
  return isNaN(val) ? 0 : val / 1_000_000;
}
