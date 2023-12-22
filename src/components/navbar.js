import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      navigate('/');
    }).catch((error) => {
      console.error('Sign out failed:', error);
    });
  };
  
  return (
    <nav className="navbar navbar-expand-lg" id="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link> {/* Link to Task List */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasklist">Task List</Link> {/* Link to Dashboard */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/taskform">Create Task</Link> {/* Link to Task Form */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Settings">Settings</Link> {/* Link to Task Form */}
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faUser} /> {/* User Icon */}
              </a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                {!isLoggedIn ? (
                  <>
                    <li><Link className="dropdown-item" to="/registration">Register</Link></li>
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  </>
                ) : (
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

export default Navbar;