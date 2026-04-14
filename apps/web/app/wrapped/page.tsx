import type { Metadata } from "next";
import { WrappedPageContent } from "@/components/wrapped/WrappedPageContent";

import { APP_URL } from "@/lib/constants";
const appUrl = APP_URL;

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
