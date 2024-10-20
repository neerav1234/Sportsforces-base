import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './Navbar.css';

const Navbar = () => {
  return (
    <AppBar position="static" className="custom-navbar">
      <Toolbar>
        <Typography variant="h6" className="navbar-title">
          Sportsforces
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" className="navbar-links"><Link to="/">About</Link></Button>
        <Button color="inherit" className="navbar-links"><Link to="/tournaments">Tournaments</Link></Button>
        <Button color="inherit" className="navbar-links"><Link to="/users">Users</Link></Button>
        <Button color="inherit">Coaches</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
