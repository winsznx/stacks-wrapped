const STACKS_BLOCK_MINUTES = 10;

export function blocksToMinutes(blocks: number): number {
  return blocks * STACKS_BLOCK_MINUTES;
}

export function formatRelativeTime(blockHeight: number, currentBlockHeight: number): string {
  const blockDiff = Math.max(0, currentBlockHeight - blockHeight);
  const minutesAgo = blocksToMinutes(blockDiff);

  if (minutesAgo < 1) return "just now";
  if (minutesAgo < 60) return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;

  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
}
