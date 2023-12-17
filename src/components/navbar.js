import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 


function Navbar() {
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
