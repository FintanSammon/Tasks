// Imports for the required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Creating an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb+srv://admin:Buddy123@cluster0.zupcoct.mongodb.net/TaskManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// Defining the Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: String,
  userUID: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

// Creating a new task
app.post('/api/tasks', async (req, res) => {
  try {
    // Creating a new Task document based on the request body
    const task = new Task({
      ...req.body,
      userUID: req.body.userUID
    });
    await task.save(); // Saving the task to the database
    res.status(201).send(task); // Responding with the created task
  } catch (error) {
    res.status(400).send(error); // Handle errors
  }
});

// Retrieve all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const userUID = req.query.userUID;
    // Find tasks that match the userUID
    const tasks = await Task.find({ userUID });
    res.send(tasks); // Respond with the retrieved tasks
  } catch (error) {
    res.status(500).send(error); // Handle any errors
  }
});

// Update a task by ID
app.put('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    // Find and update a task by its ID
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).send(); // Task not found
    }
    res.send(task); // Respond with the updated task
  } catch (error) {
    res.status(400).send(error); // Handle any errors
  }
});

// Delete a task by ID
app.delete('/api/tasks/:taskId', async (req, res) => {
  try {
    // Find and delete a task by its ID
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).send(); // Task not found
    }
    res.send(task); // Respond with the deleted task
  } catch (error) {
    res.status(500).send(error); // Handle any errors
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
