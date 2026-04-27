"use client";

import { useWallet } from "./WalletProvider";
import { truncateAddress } from "@/lib/format";

/** Wallet connect button with deferred heavy import loading */
export function WalletConnectButton() {
  const { isConnected, userAddress, connectWallet, disconnectWallet } =
    useWallet();

  if (isConnected && userAddress) {
    return (
      <div className="wallet-connected">
        <span className="wallet-address">{truncateAddress(userAddress)}</span>
        <button
          onClick={disconnectWallet}
          className="btn btn-secondary btn-sm"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button onClick={connectWallet} className="btn btn-primary">
      Connect Wallet
    </button>
  );
}
