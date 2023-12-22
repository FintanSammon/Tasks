// Imports
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function LoginForm() {
  // State for storing user credentials and login error message
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Firebase authentication and navigation hooks
  const auth = getAuth();
  const navigate = useNavigate();

  // Handler for input changes
  const handleChange = (e) => {
    // Update credentials state as the user types
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // Reset login error message on input change
    setLoginError(''); 
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate password length
    if (credentials.password.length < 6) {
      setLoginError("Password must be at least 6 characters long");
      return;
    }

    // Attempt to sign in with email and password
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // On successful login, navigate to the homepage
        navigate('/'); 
      })
      .catch((error) => {
        // Handle login errors
        console.error('Login failed:', error);
        setLoginError('Could not log in. Please register or try logging in again.'); 
      });
  };

  // Handler to autofill set credentials for demonstration purposes
  const fillLecturerCredentials = () => {
    setCredentials({ email: 'DataRep@gmail.com', password: '111111' });
  };

  // Rendering the login form
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {loginError && <div className="error-message">{loginError}</div>} 
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Login</button>
        <button type="button" onClick={fillLecturerCredentials} className="lecturer-login-button">Auto Login</button>
      </form>
    </div>
  );
}

export default LoginForm; // Exporting the LoginForm component
