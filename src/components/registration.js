import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importing Firebase auth functions
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import './login.css'; // Importing CSS for styling the form

function RegisterForm() {
  // State to store form data and registration error
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [registrationError, setRegistrationError] = useState('');

  const auth = getAuth(); // Initializing Firebase authentication
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handler for form input changes
  const handleChange = (e) => {
    // Update form data as the user types
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Reset registration error message on input change
    setRegistrationError('');
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate password length
    if (formData.password.length < 6) {
      setRegistrationError("Password must be at least 6 characters long");
      return;
    }

    // Attempt to create a new user with email and password
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log(userCredential); // Log the user credential
        navigate('/login'); // Navigate to login page on successful registration
      })
      .catch((error) => {
        // Handle errors in registration
        console.error('Registration failed:', error);
        setRegistrationError('Registration failed. Please try again.');
      });
  };

  // Rendering the registration form
  return (
    <div className="register-form-container">
      <h2>Register</h2>
      {/* Display error message if registration fails */}
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

export default RegisterForm; // Exporting the RegisterForm component
