import { Skeleton } from "@/components/ui/Skeleton";

export default function LeaderboardLoading() {
  return (
    <main className="leaderboard-page">
      <Skeleton style={{ height: 48, width: "30%" }} />
      <Skeleton style={{ height: 200 }} />
      <Skeleton style={{ height: 320 }} />
    </main>
  );
}
