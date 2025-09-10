import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Check if MetaMask is installed
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
      setError("MetaMask not detected. Please install it.");
    }
  }, []);

  // ✅ Connect wallet
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setIsMetaMaskInstalled(false);
      setError("MetaMask not detected. Please install it.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        setError(null);
      }
    } catch (err: any) {
      console.error("Wallet connection failed:", err);

      if (err?.code === -32002) {
        // MetaMask popup already open
        setError("MetaMask is already processing a connection request. Please check your extension.");
      } else if (err?.code === 4001) {
        // User rejected the request
        setError("Connection request was rejected.");
      } else {
        setError(err?.message || "Wallet connection failed.");
      }
    }
  }, []);

  // ✅ Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
    setWalletConnected(false);
    setError(null);
  }, []);

  // ✅ Handle account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [disconnectWallet]);

  return {
    walletAddress,
    walletConnected,
    isMetaMaskInstalled,
    error, // ✅ handled properly now
    connectWallet,
    disconnectWallet,
  };
};
