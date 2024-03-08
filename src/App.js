import React, { useState, useEffect } from 'react';
import './App.css';
import AddEmp from './Components/AddEmp';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import EditEmp from './Components/EditEmp';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './Components/Footer';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add login state

  useEffect(() => {
    // Check if dark mode is enabled from storage on component mount
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkModeEnabled);

    // Check if user is logged in from storage on component mount
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Store login state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove login state from localStorage
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="App" style={{ backgroundColor: darkMode ? '#0a0a0f' : '#f3f3f3' }}>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} darkMode={darkMode} /> {/* Pass login state and logout function */}
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} isLoggedIn={isLoggedIn} />} />
          <Route path="/AddEmp" element={isLoggedIn ? <AddEmp darkMode={darkMode} /> : <Navigate to="/Login" />} /> {/* Redirect to Login if not logged in */}
          <Route path="/Login" element={<Login darkMode={darkMode} onLogin={handleLogin} />} /> {/* Pass onLogin function */}
          <Route path="/EditEmp/:id" element={<EditEmp darkMode={darkMode} />} />
          <Route path="/SignUp" element={<SignUp darkMode={darkMode} onLogin={handleLogin} />} /> {/* Pass onLogin function */}
        </Routes>
        <Footer />
        <button className="switch-button" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </Router>
  );
}

export default App;
