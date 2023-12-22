//Imports
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; // Importing CSS for styling the navbar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Importing user icon from FontAwesome
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Importing Firebase authentication functions

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Hook for navigation
  const auth = getAuth(); // Initializing Firebase authentication

  // Effect to monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user); // Update login status based on user presence
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [auth]);

  // Function to handle sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false); // Update state to reflect logged out status
      navigate('/'); // Navigate to home page after sign out
    }).catch((error) => {
      console.error('Sign out failed:', error); // Log error on sign out failure
    });
  };
  
  // Rendering the navbar component
  return (
    <nav className="navbar navbar-expand-lg" id="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link> {/* Logo/Brand link */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link> {/* Navigation link to the Dashboard */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasklist">Task List</Link> {/* Navigation link to Task List */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/taskform">Create Task</Link> {/* Navigation link to Task Form */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Settings">Settings</Link> {/* Navigation link to Settings */}
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faUser} /> {/* User icon */}
              </a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                {!isLoggedIn ? (
                  // Display Register and Login options if not logged in
                  <>
                    <li><Link className="dropdown-item" to="/registration">Register</Link></li>
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  </>
                ) : (
                  // Display Sign Out option if logged in
                  <li><button className="dropdown-item" onClick={handleSignOut}>Sign Out</button></li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; // Exporting the Navbar component
