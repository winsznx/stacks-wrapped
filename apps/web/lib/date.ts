export function formatShortDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatLongDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function daysBetween(startIso: string, endIso: string): number {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  if (isNaN(start) || isNaN(end)) return 0;
  return Math.floor((end - start) / (1000 * 60 * 60 * 24));
}
