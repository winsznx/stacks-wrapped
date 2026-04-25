export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError && error.message.toLowerCase().includes("fetch");
}

export function isRateLimitError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("429");
}

export function isServerError(error: unknown): boolean {
  return error instanceof Error && /5\d{2}/.test(error.message);
}

export type ErrorCategory = "network" | "rate_limit" | "server" | "abort" | "unknown";

export function classifyError(error: unknown): ErrorCategory {
  if (isAbortError(error)) return "abort";
  if (isRateLimitError(error)) return "rate_limit";
  if (isServerError(error)) return "server";
  if (isNetworkError(error)) return "network";
  return "unknown";
}
