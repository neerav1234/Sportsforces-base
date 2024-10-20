import { MetaMaskSDK } from "@metamask/sdk"

const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Set the first account as the wallet address
        setWalletAddress(accounts[0]);
        console.log("Wallet connected:", accounts[0]);
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };