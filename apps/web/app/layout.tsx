import type { Metadata } from "next";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacks-wrapped.xyz";

export const metadata: Metadata = {
  title: "Stacks Wrapped",
  description: "Your on-chain story, committed to the chain.",
  openGraph: {
    title: "Stacks Wrapped",
    description: "Your on-chain story, committed to the chain.",
    url: appUrl,
    siteName: "Stacks Wrapped",
    images: [
      { url: `${appUrl}/api/og`, width: 1200, height: 630 },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacks Wrapped",
    description: "Your on-chain story, committed to the chain.",
    images: [`${appUrl}/api/og`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
