"use client";

import { WrappedStats } from "@winsznx/stacks-wrapped-parser";
import { WrappedCard } from "./WrappedCard";

interface WrappedCardPreviewProps {
  stats: WrappedStats;
  address: string;
}

import { Skeleton } from "@/components/ui/Skeleton";

export function WrappedCardPreview({ stats, address }: WrappedCardPreviewProps) {
  return (
    <div className="wrapped-card-preview-container">
      <div className="wrapped-card-preview-blur">
        <WrappedCard stats={stats} address={address} />
        <div className="wrapped-card-overlay">
          <p className="overlay-text">
            Connect wallet &amp; claim on-chain to unlock your card.
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton for preview
