"use client";

import { WrappedStats } from "@winsznx/stacks-wrapped-parser";

interface WrappedCardProps {
  stats: WrappedStats;
  address: string;
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function truncateContract(contractId: string, maxLen: number = 28): string {
  if (contractId.length <= maxLen) return contractId;
  return contractId.slice(0, maxLen) + "...";
}

function formatDate(isoDate: string): string {
  if (isoDate === "N/A") return "N/A";
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function WrappedCard({ stats, address }: WrappedCardProps) {
  return (
    <div id="wrapped-card" className="wrapped-card">
      <div className="wrapped-card-scanlines" />

      <div className="wrapped-card-header">
        <span className="wrapped-card-title">STACKS WRAPPED 2025</span>
        <span className="wrapped-card-address">
          {truncateAddress(address)}
        </span>
      </div>

      <div className="wrapped-card-divider" />

      <div className="wrapped-card-stats-row">
        <div className="wrapped-card-stat">
          <span className="stat-label">TX COUNT</span>
          <span className="stat-value">{stats.totalTransactions}</span>
        </div>
        <div className="wrapped-card-stat">
          <span className="stat-label">FEE TOTAL</span>
          <span className="stat-value">
            {stats.totalFeesPaidSTX.toFixed(2)} STX
          </span>
        </div>
        <div className="wrapped-card-stat">
          <span className="stat-label">FIRST TX DATE</span>
          <span className="stat-value stat-value-date">
            {formatDate(stats.firstTransactionDate)}
          </span>
        </div>
      </div>

      <div className="wrapped-card-divider" />

      <div className="wrapped-card-stats-row wrapped-card-stats-row-bottom">
        <div className="wrapped-card-stat">
          <span className="stat-label">FAV CONTRACT</span>
          <span className="stat-value stat-value-contract">
            {truncateContract(stats.favoriteContract)}
          </span>
        </div>
        <div className="wrapped-card-stat">
          <span className="stat-label">BIGGEST TRANSFER</span>
          <span className="stat-value stat-value-accent">
            {stats.biggestSTXTransferSTX.toFixed(2)} STX
          </span>
        </div>
      </div>

      <div className="wrapped-card-divider" />

      <div className="wrapped-card-footer">
        <span>stacks-wrapped.xyz</span>
        <span>#StacksWrapped</span>
      </div>
    </div>
  );
}
