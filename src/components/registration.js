import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [registrationError, setRegistrationError] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setRegistrationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setRegistrationError("Password must be at least 6 characters long");
      return;
    }
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        setRegistrationError('Registration failed. Please try again.');
      });
  };


  return (
    <div className="register-form-container">
      <h2>Register</h2>
      {registrationError && <div className="error-message">{registrationError}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
