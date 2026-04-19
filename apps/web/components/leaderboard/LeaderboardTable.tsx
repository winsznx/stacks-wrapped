"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";

interface RecentClaimer {
  address: string;
  blockHeight: number;
  relativeTime: string;
}

interface LeaderboardTableProps {
  claimers: RecentClaimer[];
  isLoading: boolean;
}

export function LeaderboardTable({ claimers, isLoading }: LeaderboardTableProps) {
  if (isLoading) {
    return (
      <div className="leaderboard-table-loading">
        <Skeleton height={32} />
        <Skeleton height={32} />
        <Skeleton height={32} />
      </div>
    );
  }

  if (claimers.length === 0) {
    return (
      <div className="leaderboard-table-empty">
        <p>No claims yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase hidden sm:table-cell">Address</th>
            <th>Block</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          {claimers.map((claimer, index) => (
            <tr key={`${claimer.address}-${claimer.blockHeight}`}>
              <td className="leaderboard-rank">{index + 1}</td>
              <td className="leaderboard-address">
                <Link href={`/wrapped?address=${claimer.address}`}>
                  {claimer.address}
                </Link>
              </td>
              <td className="leaderboard-block">{claimer.blockHeight}</td>
              <td className="leaderboard-time">{claimer.relativeTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
