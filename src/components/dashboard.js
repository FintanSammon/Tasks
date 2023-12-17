import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './dashboard.css'; 

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.className = currentTheme;
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Complete').length;
  const pendingTasks = totalTasks - completedTasks;

  const doughnutChartData = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        label: '# of Tasks',
        data: [completedTasks, pendingTasks],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

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
        <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
