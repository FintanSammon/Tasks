import React, { useState } from 'react';
import axios from 'axios'; // Importing axios for HTTP requests
import './taskform.css'; // Importing CSS for styling the form
import { getAuth } from 'firebase/auth'; // Importing Firebase authentication
import { Link } from 'react-router-dom'; // Importing Link component for navigation

function TaskForm() {
  // State hooks to store task details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  // Firebase authentication to get the current user
  const auth = getAuth();
  const user = auth.currentUser;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Checking if the user is logged in
    if (!user) {
      console.error('No user logged in');
      return;
    }

    // Creating a new task object
    const newTask = {
      title,
      description,
      dueDate,
      status,
      userUID: user.uid 
    };

    // Attempting to post the new task to the server
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      console.log('Task created:', response.data);

      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('');
    } catch (error) {
      // Handle errors in task creation
      console.error('Error creating task:', error);
    }
  };

  // Rendering the form or login prompt based on user authentication
  if (!user) {
    return (
      <div className="task-form-container">
        <h2>Please Log In</h2>
        <p>To start creating tasks, please <Link to="/login">log in</Link>.</p>
      </div>
    );
  }

  // Rendering the task creation form
  return (
    <div className="task-form-container">
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="task-form-field">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="task-form-input"
          />
        </div>
        <div className="task-form-field">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="task-form-input"
          />
        </div>
        <div className="task-form-field">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-form-input"
          />
        </div>
        <div className="task-form-field">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="task-form-input"
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        <button type="submit" className="task-form-button">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm; // Exporting the TaskForm component
