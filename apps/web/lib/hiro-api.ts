import { RawTransaction } from "@winsznx/stacks-wrapped-parser";
import { HIRO_API_BASE, TX_FETCH_LIMIT, TX_MAX_PAGES } from "./constants";

export class HiroAPIError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "HiroAPIError";
  }
}

export async function fetchAllTransactions(
  address: string
): Promise<RawTransaction[]> {
  const allTransactions: RawTransaction[] = [];

  for (let page = 0; page < TX_MAX_PAGES; page++) {
    const offset = page * TX_FETCH_LIMIT;
    const url = `${HIRO_API_BASE}/extended/v1/address/${address}/transactions?limit=${TX_FETCH_LIMIT}&offset=${offset}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new HiroAPIError(
        response.status,
        `Hiro API returned ${response.status} for address ${address}`
      );
    }

    const data = await response.json();
    const results: RawTransaction[] = data.results ?? [];
    allTransactions.push(...results);

    if (results.length < TX_FETCH_LIMIT) {
      break;
    }
  }

  return allTransactions;
}
