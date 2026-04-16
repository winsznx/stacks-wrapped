export function formatCompact(value: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatInteger(value: number): string {
  return Intl.NumberFormat("en-US").format(Math.round(value));
}

export function formatDecimal(value: number, fractionDigits: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
