"use client";

import { useState, useEffect, useCallback } from "react";
import { getTotalWrapped } from "@/lib/contract-reads";
import { HIRO_API_BASE, CONTRACT_IDENTIFIER, LEADERBOARD_POLL_INTERVAL, LEADERBOARD_EVENT_LIMIT } from "@/lib/constants";

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

function formatRelativeTime(blockHeight: number, currentBlockHeight: number): string {
  const blockDiff = currentBlockHeight - blockHeight;
  const minutesAgo = blockDiff * 10; // ~10 min per Stacks block

  if (minutesAgo < 60) return `${Math.max(1, minutesAgo)} minutes ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
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
        throw new Error(
          `Failed to fetch contract events: ${eventsResponse.status}`
        );
      }

      const eventsData = await eventsResponse.json();
      const events = eventsData.results ?? [];

      const claimers: RecentClaimer[] = events
        .slice(0, LEADERBOARD_EVENT_LIMIT)
        .map(
          (event: {
            tx_id: string;
            block_height?: number;
            contract_log?: { value?: { repr?: string } };
            stx_lock_event?: { locked_address?: string };
          }) => {
            const blockHeight = event.block_height ?? 0;
            return {
              address: event.tx_id
                ? event.tx_id.slice(0, 6) + "..." + event.tx_id.slice(-4)
                : "Unknown",
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
      const message =
        err instanceof Error
          ? err.message
          : "Failed to fetch leaderboard data";
      setError(message);
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
