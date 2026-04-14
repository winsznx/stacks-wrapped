import type { Metadata } from "next";
import { LeaderboardPageContent } from "@/components/leaderboard/LeaderboardPageContent";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacks-wrapped-web.vercel.app";

export const metadata: Metadata = {
  title: "Leaderboard — Stacks Wrapped",
  description:
    "See how many Wrapped cards have been claimed on-chain and the most recent claimers.",
  openGraph: {
    title: "Leaderboard — Stacks Wrapped",
    description:
      "See how many Wrapped cards have been claimed on-chain and the most recent claimers.",
    url: `${appUrl}/leaderboard`,
    siteName: "Stacks Wrapped",
    images: [{ url: `${appUrl}/api/og`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaderboard — Stacks Wrapped",
    description:
      "See how many Wrapped cards have been claimed on-chain and the most recent claimers.",
    images: [`${appUrl}/api/og`],
  },
};

export default function LeaderboardPage() {
  return <LeaderboardPageContent />;
}
