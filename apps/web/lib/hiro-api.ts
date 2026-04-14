import { RawTransaction } from "@winsznx/stacks-wrapped-parser";
import { HIRO_API_BASE, TX_FETCH_LIMIT, TX_MAX_PAGES } from "./constants";

export class HiroAPIError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "HiroAPIError";
    this.status = status;
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

export async function fetchAllTransactions(
  address: string
): Promise<RawTransaction[]> {
  const allTransactions: RawTransaction[] = [];

  for (let page = 0; page < TX_MAX_PAGES; page++) {
    const offset = page * TX_FETCH_LIMIT;
    const url = `${HIRO_API_BASE}/extended/v2/addresses/${address}/transactions?limit=${TX_FETCH_LIMIT}&offset=${offset}`;

    const response = await fetch(url);

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
