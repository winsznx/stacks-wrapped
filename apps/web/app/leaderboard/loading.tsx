import { Skeleton } from "@/components/ui/Skeleton";

export default function LeaderboardLoading() {
  return (
    <main className="leaderboard-page">
      <Skeleton height={48} width="30%" />
      <Skeleton height={200} />
      <Skeleton height={320} />
    </main>
  );
}
