import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';    
import About from './components/About/About'; // About is the home page
import Tournaments from './components/Tournaments/Tournaments';
import Users from './components/users/users';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} /> {/* Set About as home */}
        <Route path="/about" element={<About />} /> {/* Also accessible via /about */}
        <Route path="/tournaments" element={<Tournaments/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </Router>
  );
}

export default App;
