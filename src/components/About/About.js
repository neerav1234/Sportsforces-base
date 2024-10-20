import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import './About.css'; // Import the CSS file for styling

function About() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to simulate login
  const handleSignIn = () => {
    setLoggedIn(true);
  };
  const [walletAddress, setWalletAddress] = useState("");

  // Function to connect to MetaMask
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
        setLoggedIn(true);
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
    
  };

  return (
    <div className="about-page">
      <video autoPlay muted loop preload="auto" id="background-video">
        <source src={require('./images/animated5.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Add a wrapper for the button */}
      <div className="top-right-button">
        {!loggedIn && (
          <Button variant="contained" className="custom-signin-button" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}

        {loggedIn && (
          <Typography variant="contained" color="white">Welcome {walletAddress}, your rating is 1234</Typography>
        )}
      </div>

      <div className="about-content">
        <div className="left-section">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to SportsForces
          </Typography>
          <Typography variant="body1" gutterBottom>
            SportsForces is a platform for sports enthusiasts to connect with coaches, join tournaments, and track their progress. It allows users to explore different sports activities and manage their sports journey effectively.
          </Typography>
        </div>

        <div className="right-section">
          <img src={require('./images/badminton4.png')} alt="SportsForces" className="about-image" />
        </div>
      </div>
    </div>
  );
}

export default About;
