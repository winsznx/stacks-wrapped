export function formatSTX(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount) + " STX";
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

export function formatPercentage(value: number): string {
  return value.toFixed(2) + "%";
}

export const formatCurrency = (val: number) => `$${val.toFixed(2)}`;
