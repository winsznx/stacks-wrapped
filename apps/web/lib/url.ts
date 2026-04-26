/**
 * Sanitizes and validates internal URLs.
 * @param path - The path to sanitize.
 * @returns Clean path string.
 */
export function sanitizePath(path: string): string {
  return path.replace(/[^a-zA-Z0-9\/\?&=.-]/g, "");
}

export function getAbsoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
