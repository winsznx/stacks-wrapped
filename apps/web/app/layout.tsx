import type { Metadata } from "next";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacks-wrapped-web.vercel.app";

export const metadata: Metadata = {
  title: "Stacks Wrapped",
  description: "Your on-chain story, committed to the chain.",
  metadataBase: new URL(appUrl),
  openGraph: {
    title: "Stacks Wrapped",
    description: "Your on-chain story, committed to the chain.",
    url: appUrl,
    siteName: "Stacks Wrapped",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacks Wrapped",
    description: "Your on-chain story, committed to the chain.",
    images: ["/api/og"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="talentapp:project_verification"
          content="e428c044a0f0f246ff3b7e6ab735674dd07b314e89861d35512b89582d8a9809814d5300679ac64b5e06f76f6c771d09aecb5d1c98f880caa4099844067fdc6b"
        />
      </head>
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
