import React, { useState, useEffect } from 'react';
import './settings.css'; 

function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [taskSort, setTaskSort] = useState(localStorage.getItem('taskSort') || 'dueDate');
  const [dateFormat, setDateFormat] = useState(localStorage.getItem('dateFormat') || 'MM/DD/YYYY');

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme; 
  };

  const handleTaskSortChange = (sortOption) => {
    setTaskSort(sortOption);
    localStorage.setItem('taskSort', sortOption);
  };

  const handleDateFormatChange = (format) => {
    setDateFormat(format);
    localStorage.setItem('dateFormat', format);
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

export default Settings;
