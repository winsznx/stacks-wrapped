"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AddressInput } from "@/components/wrapped/AddressInput";
import { StatsLoader } from "@/components/wrapped/StatsLoader";
import { WrappedCard } from "@/components/wrapped/WrappedCard";
import { WrappedCardPreview } from "@/components/wrapped/WrappedCardPreview";
import { ClaimButton } from "@/components/wrapped/ClaimButton";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import { useWallet } from "@/components/wallet/WalletProvider";
import { useWrappedStats } from "@/hooks/useWrappedStats";
import { hasClaimed } from "@/lib/contract-reads";
import { generateWrappedCardPNG } from "@/lib/card-generator";
import Link from "next/link";

type WrappedState = "input" | "loading" | "preview" | "unlocked";

export function WrappedPageContent() {
  return (
    <Suspense
      fallback={
        <main className="wrapped-page">
          <p>Loading...</p>
        </main>
      }
    >
      <WrappedPageInner />
    </Suspense>
  );
}

function WrappedPageInner() {
  const searchParams = useSearchParams();
  const { isConnected, userAddress } = useWallet();
  const [address, setAddress] = useState("");
  const [pageState, setPageState] = useState<WrappedState>("input");
  const [claimed, setClaimed] = useState(false);
  const [checkingClaim, setCheckingClaim] = useState(false);

  const { stats, isLoading, error } = useWrappedStats(address);

  const prefilledAddress = searchParams.get("address");

  useEffect(() => {
    if (prefilledAddress && !address) {
      setAddress(prefilledAddress);
      setPageState("loading");
    }
  }, [prefilledAddress, address]);

  useEffect(() => {
    if (isLoading && pageState !== "loading") {
      setPageState("loading");
    }
  }, [isLoading, pageState]);

  useEffect(() => {
    if (stats && !isLoading && pageState === "loading") {
      setPageState("preview");
    }
  }, [stats, isLoading, pageState]);

  const checkClaimStatus = useCallback(async () => {
    if (!isConnected || !userAddress) return;
    setCheckingClaim(true);
    try {
      const alreadyClaimed = await hasClaimed(userAddress);
      if (alreadyClaimed) {
        setClaimed(true);
        setPageState("unlocked");
      }
    } catch {
      // Contract read failed — user has not claimed
    } finally {
      setCheckingClaim(false);
    }
  }, [isConnected, userAddress]);

  useEffect(() => {
    if (pageState === "preview" && isConnected) {
      checkClaimStatus();
    }
  }, [pageState, isConnected, checkClaimStatus]);

  function handleAddressSubmit(addr: string) {
    setAddress(addr);
    setPageState("loading");
  }

  function handleClaimed() {
    setClaimed(true);
    setPageState("unlocked");
  }

  async function handleDownload() {
    try {
      const blob = await generateWrappedCardPNG("wrapped-card");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `stacks-wrapped-${address.slice(0, 8)}.png`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PNG:", err);
    }
  }

  function handleShareOnX() {
    if (!stats) return;
    const text = encodeURIComponent(
      `Just generated my Stacks Wrapped! 🔗 [${stats.totalTransactions} txs | ${stats.totalFeesPaidSTX.toFixed(2)} STX fees | since ${new Date(stats.firstTransactionDate).toLocaleDateString()}] — claim yours at stacks-wrapped.xyz #StacksWrapped`
    );
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
  }

  if (pageState === "input") {
    return (
      <main className="wrapped-page">
        <AddressInput onSubmit={handleAddressSubmit} />
      </main>
    );
  }

  if (pageState === "loading") {
    return (
      <main className="wrapped-page">
        <StatsLoader isLoading={isLoading} error={error} />
        {error && (
          <button
            onClick={() => {
              setAddress("");
              setPageState("input");
            }}
            className="btn btn-secondary"
            style={{ marginTop: "1rem" }}
          >
            Try Again
          </button>
        )}
      </main>
    );
  }

  if (pageState === "preview" && stats) {
    return (
      <main className="wrapped-page">
        <WrappedCardPreview stats={stats} address={address} />
        <div className="wrapped-actions">
          {isConnected && !claimed && !checkingClaim && (
            <ClaimButton onClaimed={handleClaimed} />
          )}
          {!isConnected && (
            <div className="wrapped-connect-prompt">
              <WalletConnectButton />
              <p className="connect-hint">Connect your wallet to claim</p>
            </div>
          )}
          {checkingClaim && (
            <p className="checking-claim">Checking claim status...</p>
          )}
        </div>
      </main>
    );
  }

  if (pageState === "unlocked" && stats) {
    return (
      <main className="wrapped-page">
        <WrappedCard stats={stats} address={address} />
        <div className="wrapped-actions">
          <button onClick={handleDownload} className="btn btn-primary">
            Download PNG
          </button>
          <button onClick={handleShareOnX} className="btn btn-secondary">
            Share on X
          </button>
          <Link href="/leaderboard" className="btn btn-secondary">
            View Leaderboard
          </Link>
        </div>
      </main>
    );
  }

  return null;
}
