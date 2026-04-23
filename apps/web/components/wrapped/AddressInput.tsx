"use client";

import { useState } from "react";
import { useWallet } from "@/components/wallet/WalletProvider";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import { isValidStacksAddress } from "@/lib/stacks-address";

interface AddressInputProps {
  onSubmit: (address: string) => void;
}

export function AddressInput({ onSubmit }: AddressInputProps) {
  const { isConnected, userAddress } = useWallet();
  const [manualAddress, setManualAddress] = useState("");

  function handlePreview() {
    const address = manualAddress.trim();
    if (!isValidStacksAddress(address)) return;
    onSubmit(address);
  }

  function handleWalletSubmit() {
    if (userAddress) {
      onSubmit(userAddress);
    }
  }

  return (
    <div className="address-input-container">
      <h2 className="address-input-title">Enter Your Stacks Address</h2>
      <p className="address-input-subtitle">
        Enter a Stacks address (SP...) or BNS name (.btc) to generate your
        Wrapped card.
      </p>

      <div className="address-input-wallet-section">
        <WalletConnectButton />
        {isConnected && userAddress && (
          <button onClick={handleWalletSubmit} className="btn btn-primary">
            Generate My Wrapped
          </button>
        )}
      </div>

      <div className="address-input-divider">
        <span>or</span>
      </div>

      <div className="address-input-manual">
        <input
          type="text"
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          placeholder="SP... or SM... address"
          className="address-text-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePreview();
          }}
        />
        <button onClick={handlePreview} className="btn btn-secondary">
          Preview with Address
        </button>
      </div>
    </div>
  );
}
