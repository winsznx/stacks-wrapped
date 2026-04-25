export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

export function isRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500;
}

export function getStatusMessage(status: number): string {
  const messages: Record<number, string> = {
    429: "Rate limited — please wait a moment",
    500: "Server error — try again shortly",
    502: "Gateway error — the API may be updating",
    503: "Service temporarily unavailable",
    504: "Request timed out — try again",
  };
  return messages[status] ?? "An unexpected error occurred";
}
