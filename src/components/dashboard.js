// Import for libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import { Doughnut } from 'react-chartjs-2'; // Doughnut chart component
import 'chart.js/auto'; // Auto-import for Chart.js
import './dashboard.css'; // Importing CSS for styling
import { getAuth } from 'firebase/auth'; // Firebase authentication

// Dashboard functional component
function Dashboard() {
  // State for storing tasks and current user
  const [tasks, setTasks] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser; 

  // Effect to set the initial theme based on local storage
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light'; // Get current theme or default to 'light'
    document.body.className = currentTheme; // Apply theme to body
  }, []);

  // Effect to fetch tasks when the user changes
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) {
        console.error('No user logged in');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/tasks?userUID=${user.uid}`);
        setTasks(response.data); // Set tasks data from response
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks(); // Fetch tasks
  }, [user]); 

  //  Rendering for non-authenticated users
  if (!user) {
    return (
      <div className="dashboard-container">
        <h2>Please Log In</h2>
        <p>To view your dashboard, please log in.</p>
      </div>
    );
  }

  // Calculating task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Complete').length;
  const pendingTasks = totalTasks - completedTasks;

  // Data preparation for the Doughnut chart
  const doughnutChartData = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        label: '# of Tasks',
        data: [completedTasks, pendingTasks],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Rendering the dashboard component
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Dashboard</h2>
      <div className="dashboard-summary">
        <div className="summary-item">
          <p>Total Tasks</p>
          <p>{totalTasks}</p>
        </div>
        <div className="summary-item">
          <p>Completed Tasks</p>
          <p>{completedTasks}</p>
        </div>
        <div className="summary-item">
          <p>Pending Tasks</p>
          <p>{pendingTasks}</p>
        </div>
      </div>
      <div className="flex-container">
        <div className="chart-container">
          <Doughnut data={doughnutChartData} /> {/* Rendering the Doughnut chart */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; // Exporting the Dashboard component
