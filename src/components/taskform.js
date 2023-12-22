import React, { useState } from 'react';
import axios from 'axios';
import './taskform.css';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('No user logged in');
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      status,
      userUID: user.uid 
    };


    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);

      console.log('Task created:', response.data);

      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('');
    } catch (error) {
      // Error Handler
      console.error('Error creating task:', error);
    }
  };

  if (!user) {
    return (
      <div className="task-form-container">
        <h2>Please Log In</h2>
        <p>To start creating tasks, please <Link to="/login">log in</Link>.</p>
      </div>
    );
  }

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

export default TaskForm;