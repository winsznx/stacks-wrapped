/**
 * Formats Stacks block height or timestamp into readable relative time.
 */
export function formatBlockTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(timestamp * 1000).toLocaleDateString();
}

/**
 * Formats relative time between two block heights.
 * Assumes ~10 minute block time on Stacks.
 */
export function formatRelativeTime(blockHeight: number, currentBlockHeight: number): string {
  const blockDiff = currentBlockHeight - blockHeight;
  if (blockDiff <= 0) return "just now";
  
  const minutesAgo = blockDiff * 10;
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo}d ago`;
}
