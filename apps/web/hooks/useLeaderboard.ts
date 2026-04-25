"use client";

import { useState, useEffect, useCallback } from "react";
import { getTotalWrapped } from "@/lib/contract-reads";
import {
  HIRO_API_BASE,
  CONTRACT_IDENTIFIER,
  LEADERBOARD_POLL_INTERVAL,
  LEADERBOARD_EVENT_LIMIT,
} from "@/lib/constants";
import { formatRelativeTime } from "@/lib/time";
import { getErrorMessage } from "@/lib/errors";

interface RecentClaimer {
  address: string;
  blockHeight: number;
  relativeTime: string;
}

interface UseLeaderboardReturn {
  totalGenerated: number | null;
  recentClaimers: RecentClaimer[];
  isLoading: boolean;
  error: string | null;
}

export function useLeaderboard(): UseLeaderboardReturn {
  const [totalGenerated, setTotalGenerated] = useState<number | null>(null);
  const [recentClaimers, setRecentClaimers] = useState<RecentClaimer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const [total, eventsResponse, tipResponse] = await Promise.all([
        getTotalWrapped(),
        fetch(
          `${HIRO_API_BASE}/extended/v1/contract/${CONTRACT_IDENTIFIER}/events?limit=${LEADERBOARD_EVENT_LIMIT}`
        ),
        fetch(`${HIRO_API_BASE}/extended/v2/blocks?limit=1`),
      ]);

      setTotalGenerated(total);

      let currentBlockHeight = 0;
      if (tipResponse.ok) {
        const tipData = await tipResponse.json();
        currentBlockHeight = tipData.results?.[0]?.height ?? 0;
      }

      if (!eventsResponse.ok) {
        throw new Error(`Failed to fetch contract events: ${eventsResponse.status}`);
      }

      const eventsData = await eventsResponse.json();
      const events = eventsData.results ?? [];

      const claimers: RecentClaimer[] = events
        .slice(0, LEADERBOARD_EVENT_LIMIT)
        .map(
          (event: { tx_id: string; block_height?: number }) => {
            const blockHeight = event.block_height ?? 0;
            const shortId = event.tx_id
              ? `${event.tx_id.slice(0, 6)}...${event.tx_id.slice(-4)}`
              : "Unknown";
            return {
              address: shortId,
              blockHeight,
              relativeTime: currentBlockHeight
                ? formatRelativeTime(blockHeight, currentBlockHeight)
                : "Recently",
            };
          }
        );

      setRecentClaimers(claimers);
      setError(null);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      console.warn("[useLeaderboard] Poll failed:", msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, LEADERBOARD_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  return { totalGenerated, recentClaimers, isLoading, error };
}

// Polling error management improved
