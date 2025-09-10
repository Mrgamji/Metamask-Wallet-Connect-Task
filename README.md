# 🏡 Metamask Wallet Connect Task

A React + TypeScript + Vite project that integrates **MetaMask wallet connection** with a property listing application.  
Users can connect/disconnect their wallet, view account details, save favorite properties, and explore listings.

---

## 🚀 Features

- 🔗 **MetaMask Wallet Integration**
  - Detects if MetaMask is installed
  - Connect / Disconnect wallet
  - Handles account change events
  - Displays connected wallet address

- 🏠 **Property App Pages**
  - Home Page – browse featured properties
  - Listings Page – view all properties
  - Property Detail Page – see full details
  - Favorites Page – save & manage favorite properties
  - Dashboard – wallet details & quick actions

- 🎨 **UI / UX**
  - Built with **React + TypeScript**
  - Styled using **TailwindCSS**
  - Icons via **Lucide React**
  - Modern, responsive, and clean design

---

## 📦 Tech Stack

- **Frontend Framework:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler/Dev Server:** [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Wallet API:** [MetaMask Ethereum API](https://docs.metamask.io/)

---

## 🛠️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Mrgamji/Metamask-Wallet-Connect-Task.git
cd Metamask-Wallet-Connect-Task
---

Install dependencies:

npm install


Run the development server:

npm run dev


Open your browser and visit:

http://localhost:5173

🔑 Wallet Integration

Ensure you have MetaMask
 installed in your browser.

Click the Connect Wallet button in the navigation bar.

Approve the connection in MetaMask.

Your wallet address will be displayed in the UI.

Disconnect anytime via the wallet modal.

📂 Project Structure
src/
│── App.tsx               # Main application router
│── types/
│   └── wallet.ts         # Custom hook for wallet connection
│── components/
│   ├── Layout/
│   │   └── Navbar.tsx    # Top navigation bar
│   ├── PropertyCard/     # Property card components
│   └── Modals/
│       └── WalletModal.tsx  # Wallet connect modal
│── pages/
│   ├── HomePage.tsx
│   ├── ListingsPage.tsx
│   ├── PropertyDetailPage.tsx
│   ├── FavoritesPage.tsx
│   └── DashboardPage.tsx
