import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { Navbar } from "./components/Layout/Navbar";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { DashboardPage } from "./pages/DashboardPage";
import WalletModal from "./components/Modals/WalletModal";

// import your wallet hook
import { useWallet } from "./types/wallet";

const AppContent: React.FC = () => {
  const {
    walletAddress,
    walletConnected,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const [favorites, setFavorites] = useState(["1", "4"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Favorites handler
  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Navigate to property details
  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        onConnectWallet={() => setIsModalOpen(true)}
        onDisconnectWallet={disconnectWallet}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
      />

      {/* Show MetaMask warning if not installed */}
      {!isMetaMaskInstalled && (
        <div className="bg-red-100 text-red-700 text-center py-2">
          MetaMask is not installed.{" "}
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Install here
          </a>
        </div>
      )}

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={connectWallet}
        walletAddress={walletAddress}
        onDisconnect={disconnectWallet}
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/listings"
          element={
            <ListingsPage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/property/:id"
          element={
            <PropertyDetailPage onToggleFavorite={handleToggleFavorite} />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              walletConnected={walletConnected}
              onConnectWallet={() => setIsModalOpen(true)}
              walletAddress={walletAddress}
            />
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
