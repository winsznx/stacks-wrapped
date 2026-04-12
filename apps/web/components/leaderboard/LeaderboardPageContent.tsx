"use client";

import { GlobalCounter } from "@/components/leaderboard/GlobalCounter";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import Link from "next/link";

export function LeaderboardPageContent() {
  const { totalGenerated, recentClaimers, isLoading, error } =
    useLeaderboard();

  return (
    <main className="leaderboard-page">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Leaderboard</h1>
        <Link href="/wrapped" className="btn btn-primary">
          Generate My Wrapped
        </Link>
      </div>

      <GlobalCounter total={totalGenerated} isLoading={isLoading} />

      {error && <p className="leaderboard-error">{error}</p>}

      <section className="leaderboard-recent">
        <h2 className="leaderboard-section-title">Recent Claims</h2>
        <LeaderboardTable claimers={recentClaimers} isLoading={isLoading} />
      </section>

      <p className="leaderboard-refresh-note">
        Auto-refreshes every 30 seconds
      </p>
    </main>
  );
}
