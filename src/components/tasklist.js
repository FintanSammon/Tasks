import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import './tasklist.css'; // Importing CSS for styling
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importing Firebase auth functions


// Component for editing a task
function TaskEditForm({ task, onSave, onCancel, onChange }) {
  return (
    <div className="task-edit-form">
      {/* Input fields for editing task details */}
      <input
        type="text"
        className="task-edit-input"
        placeholder="Title"
        value={task.title}
        onChange={(e) => onChange(e, 'title')}
      />
      <textarea
        className="task-edit-input"
        placeholder="Description"
        value={task.description}
        onChange={(e) => onChange(e, 'description')}
      />
      <input
        type="date"
        className="task-edit-input"
        value={task.dueDate}
        onChange={(e) => onChange(e, 'dueDate')}
      />
      <select
        className="task-edit-input"
        value={task.status}
        onChange={(e) => onChange(e, 'status')}
      >
        <option value="">Select Status</option>
        <option value="To Do">To Do</option>
        <option value="Complete">Complete</option>
      </select>
      <button onClick={onSave} className="action-button save-button">Save</button>
      <button onClick={onCancel} className="action-button cancel-button">Cancel</button>
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [editingTask, setEditingTask] = useState(null); // State for the task currently being edited
  
  // States for sorting and date format preferences
  const [sortKey, setSortKey] = useState(localStorage.getItem('taskSort') || 'dueDate');
  const [dateFormat, setDateFormat] = useState(localStorage.getItem('dateFormat') || 'MM/DD/YYYY');

  // Function to sort tasks based on a key
  const sortTasks = (tasksToSort, key = sortKey) => {
    switch (key) {
      case 'dueDate':
        tasksToSort.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
        break;
      case 'status':
        tasksToSort.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'title':
        tasksToSort.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    setTasks(tasksToSort); // Update sorted tasks
  };

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error('No user logged in');
      return;
    }

        // Fetching logic with axios
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks?userUID=${user.uid}`);
      let fetchedTasks = response.data;

      switch (sortKey) {
        case 'dueDate':
          fetchedTasks.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
          break;
        case 'status':
          fetchedTasks.sort((a, b) => a.status.localeCompare(b.status));
          break;
        case 'title':
          fetchedTasks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }

      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

    // Effect hook to monitor auth state and localStorage changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTasks(user.uid); // Fetching tasks when user logs in
      } else {
        setTasks([]); // Clearing the tasks when no user is logged in
      }
    });

    const handleStorageChange = (event) => {
      if (event.key === 'taskSort') {
        const newSortKey = localStorage.getItem('taskSort') || 'dueDate';
        setSortKey(newSortKey);
        sortTasks([...tasks], newSortKey);
      } else if (event.key === 'dateFormat') {
        setDateFormat(localStorage.getItem('dateFormat') || 'MM/DD/YYYY');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  
  
  // Function to format date strings
  const formatDate = (isoString) => {
    if (!isoString) return 'No date';
    const date = new Date(isoString);

    
        // Date formatting logic
    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return date.toLocaleDateString('en-GB');
      case 'YYYY/MM/DD':
        return date.toLocaleDateString('en-CA');
      case 'MM/DD/YYYY':
      default:
        return date.toLocaleDateString('en-US');
    }
  };

  // Function to mark a task as complete
  const markAsComplete = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: 'Complete' } : task
    );
    setTasks(updatedTasks);

    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: 'Complete' });
      if (response.status !== 200) {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error marking task as complete:', error);
      alert('Could not mark the task as complete. Please try again.');
      fetchTasks();
    }
  };

    // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

    // Function to set a task for editing
  const editTask = (task) => {
    setEditingTask({ ...task });
  };
  
  // Function to cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
  };

    // Function to handle input change in edit form
  const handleEditInputChange = (e, field) => {
    const updatedTask = { ...editingTask, [field]: e.target.value };
    setEditingTask(updatedTask);
  };


    // Function to update a task
  const updateTask = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, editingTask);
      fetchTasks();
      cancelEdit();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


    // Rendering the task list
  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            {editingTask && editingTask._id === task._id ? (
              <TaskEditForm
                task={editingTask}
                onSave={updateTask}
                onCancel={cancelEdit}
                onChange={handleEditInputChange}
              />
            ) : (
              <div className="task-details">
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <p className="task-description">{task.description}</p>
                <p className="task-due-date">Due Date: {formatDate(task.dueDate)}</p> 
                <p className="task-status">Status: {task.status}</p>
              </div>
              <div className="task-actions">
                  <button onClick={() => markAsComplete(task._id)} className="action-button complete-button">Complete</button>
                  <button onClick={() => deleteTask(task._id)} className="action-button delete-button">Delete</button>
                  <button onClick={() => editTask(task)} className="action-button edit-button">Edit</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList; // Exporting the TaskList component
