// Imports
import React, { useState, useEffect } from 'react';
import './settings.css'; 

function Settings() {
  // State variables to manage user settings
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Initialize theme from local storage or default to 'light'
  const [taskSort, setTaskSort] = useState(localStorage.getItem('taskSort') || 'dueDate'); // Initialize task sorting from local storage or default to 'dueDate'
  const [dateFormat, setDateFormat] = useState(localStorage.getItem('dateFormat') || 'MM/DD/YYYY'); // Initialize date format from local storage or default to 'MM/DD/YYYY'

  // Using Effect to update the body class based on the selected theme
  useEffect(() => {
    document.body.className = theme; // Setting the body class to the selected theme ('light' or 'dark')
  }, [theme]);

  // Handler function to change the theme
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Updating the theme state variable
    localStorage.setItem('theme', newTheme); // Saving the theme preference in local storage for persistence
    document.body.className = newTheme; // Updating the body class for immediate theme change
  };

  // Handler function to change the task sorting option
  const handleTaskSortChange = (sortOption) => {
    setTaskSort(sortOption); // Updating the task sorting state variable
    localStorage.setItem('taskSort', sortOption); // Saving the sorting preference in local storage
  };

  // Handler function to change the date format
  const handleDateFormatChange = (format) => {
    setDateFormat(format); // Update the date format state variable
    localStorage.setItem('dateFormat', format); // Saving the date format preference in local storage
  };

  return (
    <div className="settings-container">
      <h2 className="settings-header">Settings</h2>
      <div className="settings-option">
        <label htmlFor="theme-select">Theme:</label>
        <select id="theme-select" value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="settings-option">        
        <label htmlFor="task-sort-select">Task Display Order:</label>
        <select id="task-sort-select" value={taskSort} onChange={(e) => handleTaskSortChange(e.target.value)}>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="settings-option">
        <label htmlFor="date-format-select">Date Format:</label>
        <select id="date-format-select" value={dateFormat} onChange={(e) => handleDateFormatChange(e.target.value)}>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY/MM/DD">YYYY/MM/DD</option>
        </select>
      </div>
    </div>
  );
}

// Settings Page Export
export default Settings;
