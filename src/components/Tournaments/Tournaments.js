import React, { useState } from 'react';
import { createStakingTournament, registerStakingTournament, registerTournament, voteForPlayer } from '../connector'; // Import from connector.js

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Modal,
  TextField,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Material UI icon for the plus sign
import './Tournaments.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

function Tournaments() {
  const [open, setOpen] = useState(false);
  const [voteOpen, setVoteOpen] = useState(false); // State for vote modal
  const [selectedTournament, setSelectedTournament] = useState(null); // State for the selected tournament's matches
  const [selectedMatch, setSelectedMatch] = useState(null); // State for the selected match
  const [prize, setPrize] = useState('');

  // Sample data for upcoming, ongoing, and completed tournaments
  const upcomingTournaments = [
    { id: 1, name: 'Champions Cup', prize: '$5000' },
    { id: 2, name: 'Global Sports Gala', prize: '$3000' },
  ];

  const ongoingTournaments = [
    { id: 3, name: 'National League', prize: '$4000', matches: [{ matchId: 1, player1: 'Player A', player2: 'Player B' }, { matchId: 2, player1: 'Player C', player2: 'Player D' }] },
    { id: 4, name: 'Summer Slam', prize: '$2000', matches: [{ matchId: 3, player1: 'Player E', player2: 'Player F' }] },
  ];

  const completedTournaments = [
    { id: 5, name: 'Winter Classic', prize: '$1000', winner: 'Alice Smith' },
    { id: 6, name: 'Spring Championship', prize: '$2000', winner: 'Bob Johnson' },
  ];

  // Placeholder match data in case a tournament has no matches
  const placeholderMatches = [
    { matchId: 0, player1: 'Placeholder Player 1', player2: 'Placeholder Player 2' },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleVoteOpen = (tournament) => {
    setSelectedTournament(tournament);
    setVoteOpen(true);
  };
  const handleVoteClose = () => {
    setVoteOpen(false);
    setSelectedMatch(null); // Reset selected match on closing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to create a tournament with the prize here
    console.log('Tournament Prize:', prize);
    createStakingTournament(prize);
    handleClose(); // Close the modal after submission
  };

  const handleVote = (player, id) => {
    voteForPlayer(4, id, 3);
    console.log(`Voted for ${player} in match ${selectedMatch.matchId}`);
    handleVoteClose();
  };

  return (
    <div className="tournaments-page">
      <Box className="tournaments-section">
        <Typography variant="h4" className="tournament-title">Upcoming Tournaments</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '40%' }}>Tournament Name</TableCell>
                <TableCell style={{ width: '20%' }}>Tournament ID</TableCell>
                <TableCell style={{ width: '20%' }}>Prize</TableCell>
                <TableCell style={{ width: '20%' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingTournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell>{tournament.name}</TableCell>
                  <TableCell>{tournament.id}</TableCell>
                  <TableCell>{tournament.prize}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => registerTournament(2)}>Register</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box className="tournaments-section">
        <Typography variant="h4" className="tournament-title">Ongoing Tournaments</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '40%' }}>Tournament Name</TableCell>
                <TableCell style={{ width: '20%' }}>Tournament ID</TableCell>
                <TableCell style={{ width: '20%' }}>Prize</TableCell>
                <TableCell style={{ width: '20%' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ongoingTournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell>{tournament.name}</TableCell>
                  <TableCell>{tournament.id}</TableCell>
                  <TableCell>{tournament.prize}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleVoteOpen(tournament)}>Vote</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box className="tournaments-section">
        <Typography variant="h4" className="tournament-title">Completed Tournaments</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '40%' }}>Tournament Name</TableCell>
                <TableCell style={{ width: '20%' }}>Tournament ID</TableCell>
                <TableCell style={{ width: '20%' }}>Prize</TableCell>
                <TableCell style={{ width: '20%' }}>Winner Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedTournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell>{tournament.name}</TableCell>
                  <TableCell>{tournament.id}</TableCell>
                  <TableCell>{tournament.prize}</TableCell>
                  <TableCell>{tournament.winner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Plus Button to Open Modal */}
      <IconButton
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#4caf50',
          color: 'white',
        }}
      >
        <AddIcon />
      </IconButton>

      {/* Modal for Creating Tournament */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create Tournament
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Prize"
              variant="outlined"
              fullWidth
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
              required
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Modal for Voting */}
      <Modal open={voteOpen} onClose={handleVoteClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            {selectedMatch ? `Vote for a Player in Match ${selectedMatch.matchId}: ${selectedMatch.player1} vs ${selectedMatch.player2}` : `Select a Match to Vote`}
          </Typography>
          {!selectedMatch ? (
            (selectedTournament && selectedTournament.matches.length > 0 ? 
              selectedTournament.matches : placeholderMatches
            ).map((match) => (
              <Button
                key={match.matchId}
                variant="outlined"
                fullWidth
                onClick={() => setSelectedMatch(match)}
                sx={{ 
                  marginBottom: '10px', 
                  color: 'black', // Set text color to black or any visible color 
                  backgroundColor: '#006400', // Set the background color to contrast
                  borderColor: 'black' // Set border color for better visibility
                }}
              >
                {match.player1} vs {match.player2}
              </Button>
            ))
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleVote(selectedMatch.player1, 1)}
                fullWidth
                style={{ marginBottom: '10px' }}
              >
                Vote for {selectedMatch.player1}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleVote(selectedMatch.player2, 2)}
                fullWidth
              >
                Vote for {selectedMatch.player2}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Tournaments;
