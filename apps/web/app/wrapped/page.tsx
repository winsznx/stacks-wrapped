import type { Metadata } from "next";
import { WrappedPageContent } from "@/components/wrapped/WrappedPageContent";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacks-wrapped-web.vercel.app";

export const metadata: Metadata = {
  title: "Generate Your Wrapped — Stacks Wrapped",
  description:
    "Fetch your lifetime Stacks on-chain stats and generate a shareable Wrapped card.",
  openGraph: {
    title: "Generate Your Wrapped — Stacks Wrapped",
    description:
      "Fetch your lifetime Stacks on-chain stats and generate a shareable Wrapped card.",
    url: `${appUrl}/wrapped`,
    siteName: "Stacks Wrapped",
    images: [{ url: `${appUrl}/api/og`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate Your Wrapped — Stacks Wrapped",
    description:
      "Fetch your lifetime Stacks on-chain stats and generate a shareable Wrapped card.",
    images: [`${appUrl}/api/og`],
  },
};

export default function WrappedPage() {
  return <WrappedPageContent />;
}
