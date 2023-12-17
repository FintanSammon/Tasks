import React, { useState } from 'react';
import axios from 'axios';
import './taskform.css';


function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const newTask = {
      title,
      description,
      dueDate,
      status,
    };

    try {
      // Send a POST request to the server to create a new task
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);

      // Handle the response as needed 
      console.log('Task created:', response.data);

      // Reset the form inputs
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('');
    } catch (error) {
      // Handle any errors 
      console.error('Error creating task:', error);
    }
  };

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
