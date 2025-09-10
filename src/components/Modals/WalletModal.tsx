import React, { useState, useEffect } from "react";
import { X, Wallet } from "lucide-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => Promise<void>;
  walletAddress?: string | null;
  onDisconnect: () => void;
  error?: string | null;
}

// Helper: shorten address like 0x1234...abcd
const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  walletAddress,
  onDisconnect,
  error: propError,
}) => {
  const [loading, setLoading] = useState(false);
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const installed = !!(window.ethereum);
      setMetaMaskInstalled(installed);
      if (!installed) {
        setLocalError("MetaMask not detected.");
      } else {
        setLocalError(null);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setLocalError(propError || null);
  }, [propError]);

  const connectMetaMask = async () => {
    setLocalError(null);
    setLoading(true);

    try {
      await onConnect();
      // Don't close automatically - let parent component handle it
    } catch (err: any) {
      setLocalError(err.message || "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    onDisconnect();
    onClose();
  };

  if (!isOpen) return null;

  const error = localError || propError;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          {walletAddress ? "Wallet Connected" : "Connect Wallet"}
        </h2>

        {walletAddress ? (
          <div className="flex flex-col items-center space-y-4">
            {/* Wallet Address Display */}
            <div className="flex items-center space-x-2 px-4 py-3 rounded-xl border bg-gray-50 w-full justify-center">
              <Wallet className="w-6 h-6 text-yellow-500" />
              <span className="font-mono text-lg">
                {shortenAddress(walletAddress)}
              </span>
            </div>

            {/* Disconnect Button */}
            <button
              onClick={handleDisconnect}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <>
            {!metaMaskInstalled ? (
              // MetaMask not installed
              <div className="flex flex-col items-center space-y-4">
                <p className="text-red-600 font-medium">
                  MetaMask not found
                </p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                  Install MetaMask
                </a>
              </div>
            ) : (
              // MetaMask installed → allow connect
              <>
                <button
                  onClick={connectMetaMask}
                  disabled={loading}
                  className="flex items-center justify-center w-full p-4 mb-4 border rounded-xl hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wallet className="w-6 h-6 text-yellow-500 mr-3" />
                  <span>{loading ? "Connecting..." : "Connect with MetaMask"}</span>
                </button>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg w-full text-center">
                    {error}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WalletModal;