import { RawTransaction } from "@winsznx/stacks-wrapped-parser";
import { HIRO_API_BASE, TX_FETCH_LIMIT, TX_MAX_PAGES } from "./constants";

export class HiroAPIError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "HiroAPIError";
    this.status = status;
    Object.setPrototypeOf(this, HiroAPIError.prototype);
  }
}

interface V2TransactionResult {
  tx: RawTransaction;
  stx_sent: string;
  stx_received: string;
}

interface V2TransactionsResponse {
  limit: number;
  offset: number;
  total: number;
  results: V2TransactionResult[];
}

async function fetchWithRetry(url: string, signal?: AbortSignal, retries = 3): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, { signal });
      if (response.ok || response.status < 500) return response;
    } catch (err) {
      if (signal?.aborted) throw err;
      if (attempt === retries - 1) throw err;
    }
    await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
  }
  return fetch(url, { signal });
}

export async function fetchAllTransactions(
  address: string,
  signal?: AbortSignal
): Promise<RawTransaction[]> {
  const allTransactions: RawTransaction[] = [];

  for (let page = 0; page < TX_MAX_PAGES; page++) {
    const offset = page * TX_FETCH_LIMIT;
    const url = `${HIRO_API_BASE}/extended/v2/addresses/${address}/transactions?limit=${TX_FETCH_LIMIT}&offset=${offset}`;

    const response = await fetchWithRetry(url, signal);

    if (!response.ok) {
      throw new HiroAPIError(
        response.status,
        `Hiro API returned ${response.status} for address ${address}`
      );
    }

    const data: V2TransactionsResponse = await response.json();
    const txs = data.results.map((entry) => entry.tx);
    allTransactions.push(...txs);

    if (data.results.length < TX_FETCH_LIMIT) {
      break;
    }
  }

  return allTransactions;
}

// Exponential backoff implemented
