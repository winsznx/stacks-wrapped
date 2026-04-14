"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";

interface WalletContextValue {
  userSession: UserSession;
  isConnected: boolean;
  userAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

const WalletContext = createContext<WalletContextValue>({
  userSession,
  isConnected: false,
  userAddress: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const address =
        userData.profile?.stxAddress?.mainnet ?? null;
      setIsConnected(true);
      setUserAddress(address);
    }
  }, []);

  function connectWallet() {
    showConnect({
      appDetails: {
        name: "Stacks Wrapped",
        icon: typeof window !== "undefined" ? `${window.location.origin}/logo.svg` : "/logo.svg",
      },
      onFinish: () => {
        const userData = userSession.loadUserData();
        const address =
          userData.profile?.stxAddress?.mainnet ?? null;
        setIsConnected(true);
        setUserAddress(address);
      },
      onCancel: () => {},
      userSession,
    });
  }

  function disconnectWallet() {
    userSession.signUserOut();
    setIsConnected(false);
    setUserAddress(null);
  }

  return (
    <WalletContext.Provider
      value={{
        userSession,
        isConnected,
        userAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
