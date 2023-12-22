import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setLoginError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password.length < 6) {
      setLoginError("Password must be at least 6 characters long");
      return;
    }
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setLoginError('Could not log in. Please register or try logging in again.'); 
      });
  };

  const fillLecturerCredentials = () => {
    setCredentials({ email: 'DataRep@gmail.com', password: '111111' });
  };

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

export default LoginForm;
