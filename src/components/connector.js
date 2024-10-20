import { ethers } from 'ethers';
import contractABI from './abi'; // Import your contract ABI

const contractAddress = "0x1a3951c384f850dbfCBb042ba00754aEb06Fb9e3"; // Replace with your contract address

export const initializeContract = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum); // Updated to use BrowserProvider in v6
        const signer = await provider.getSigner(); // In v6, this is now asynchronous
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        return contract; // Return the initialized contract
      } else {
        console.error("MetaMask not found. Please install MetaMask.");
        return null;
      }
    } catch (error) {
      console.error("Error initializing contract:", error);
      return null;
    }
  };

// Function to create for a tournament
export const createStakingTournament = async (stakedAmount) => {
    try {
      const contract = await initializeContract();
      if (!contract) return;
  
      const tx = await contract.createStakingTournament(stakedAmount);
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log(`Tournament registered successfully.`);
    } catch (error) {
      console.error("Error registering tournament:", error);
    }
  };

// Function to register for a tournament
export const registerTournament = async (tournamentId) => {
  try {
    const contract = await initializeContract();
    if (!contract) return;

    const tx = await contract.registerGeneric(tournamentId);
    await tx.wait(); // Wait for the transaction to be confirmed
    console.log(`Tournament ${tournamentId} registered successfully.`);
  } catch (error) {
    console.error("Error registering tournament:", error);
  }
};

// Function to register for a staking tournament
export const registerStakingTournament = async (tournamentId) => {
    try {
      const contract = await initializeContract();
      if (!contract) return;
  
      const tx = await contract.registerStaking(tournamentId);
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log(`Tournament ${tournamentId} registered successfully.`);
    } catch (error) {
      console.error("Error registering tournament:", error);
    }
  };
  

// Function to vote for a player
export const voteForPlayer = async (matchId, playerId, tournamentId) => {
  try {
    const contract = await initializeContract();
    if (!contract) return;

    const tx = await contract.vote(matchId, playerId, tournamentId);
    await tx.wait();
    console.log(`Voted for player ${playerId} in match ${matchId}.`);
  } catch (error) {
    console.error("Error voting for player:", error);
  }
};

