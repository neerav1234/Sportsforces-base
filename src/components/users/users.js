import React, { useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import './Users.css';

// Function to assign color based on rating (Codeforces style)
const getRatingColor = (rating) => {
  if (rating < 1200) return 'gray';
  if (rating < 1400) return 'green';
  if (rating < 1600) return 'cyan';
  if (rating < 1900) return 'blue';
  if (rating < 2100) return 'purple';
  if (rating < 2400) return 'orange';
  if (rating < 2600) return 'red';
  return 'darkred'; // Grandmaster level
};

// Function to assign rank title based on rating
const getRankTitle = (rating) => {
  if (rating < 1200) return 'Newbie';
  if (rating < 1400) return 'Pupil';
  if (rating < 1600) return 'Specialist';
  if (rating < 1900) return 'Expert';
  if (rating < 2100) return 'Candidate Master';
  if (rating < 2400) return 'Master';
  if (rating < 2600) return 'International Master';
  return 'Grandmaster';
};

function Users() {
  // Sample user data
  const users = [
    { id: 1, username: 'john_doe', rating: 1450, rank: 1, avatar: '/avatar1.jpg', ability: 80, strength: 75, flexibility: 85 },
    { id: 2, username: 'jane_smith', rating: 1200, rank: 2, avatar: '/avatar2.jpg', ability: 60, strength: 70, flexibility: 65 },
    { id: 3, username: 'mike_jones', rating: 2300, rank: 3, avatar: '/avatar3.jpg', ability: 90, strength: 85, flexibility: 90 },
    { id: 4, username: 'sarah_connor', rating: 1100, rank: 4, avatar: '/avatar4.jpg', ability: 50, strength: 55, flexibility: 60 },
  ];

  // State to track which card is flipped
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (id) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="users-page">
      <h1 className="users-title">Users List</h1>

      <Grid container spacing={4}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <div
              className={`flip-card ${flippedCards[user.id] ? 'flipped' : ''}`}
              onClick={() => handleFlip(user.id)} // Flip on click
            >
              <div className="flip-card-inner">
                {/* Front of the card */}
                <Card className="user-card front">
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={user.avatar}
                        alt={user.username}
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                      />
                      <Box>
                      <Typography variant="h6" style={{ color: 'black' }}>{user.username}</Typography>
                      <Typography variant="body2" style={{ color: 'black' }}>
                          Rank #{user.rank}
                        </Typography>
                      </Box>
                    </Box>

                    <Box mt={2}>
                      <Typography variant="body1">Rating</Typography>
                      <Typography
                        variant="h6"
                        className="user-rating"
                        style={{ color: getRatingColor(user.rating) }}
                      >
                        {user.rating}
                      </Typography>

                      <Typography
                        variant="body2"
                        className="user-rank-title"
                        style={{ color: getRatingColor(user.rating) }}
                      >
                        {getRankTitle(user.rating)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                {/* Back of the card */}
                <Card className="user-card back">
                  <CardContent>
                    <Typography variant="h6">Abilities</Typography>
                    <Typography>Ability: {user.ability}</Typography>
                    <Typography>Strength: {user.strength}</Typography>
                    <Typography>Flexibility: {user.flexibility}</Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Users;
