"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { PostConditionMode } from "@stacks/transactions";
import { CONTRACT_DEPLOYER, CONTRACT_NAME } from "@/lib/constants";
import { getNetwork } from "@/lib/contract-functions";

interface ClaimButtonProps {
  onClaimed: () => void;
}

export function ClaimButton({ onClaimed }: ClaimButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleClaim() {
    setIsPending(true);

    await openContractCall({
      contractAddress: CONTRACT_DEPLOYER,
      contractName: CONTRACT_NAME,
      functionName: "claim-wrapped-card",
      functionArgs: [],
      network: getNetwork(),
      postConditionMode: PostConditionMode.Deny,
      appDetails: {
        name: "Stacks Wrapped",
        icon: typeof window !== "undefined" ? `${window.location.origin}/logo.svg` : "/logo.svg",
      },
      onFinish: () => {
        setIsPending(false);
        onClaimed();
      },
      onCancel: () => {
        setIsPending(false);
      },
    });
  }

  return (
    <button
      onClick={handleClaim}
      disabled={isPending}
      className="btn btn-primary btn-lg"
      aria-label="Claim your Wrapped card on-chain"
    >
      {isPending ? (
        <span className="claim-loading">
          <span className="spinner" />
          Claiming...
        </span>
      ) : (
        "Claim Card On-Chain"
      )}
    </button>
  );
}
