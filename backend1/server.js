const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task'); // This is where you import the Task model you've defined using Mongoose

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection with Mongoose (including the connection string)
mongoose.connect('mongodb+srv://admin:Buddy123@cluster0.zupcoct.mongodb.net/TaskManager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define routes for CRUD operations

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Define other CRUD endpoints as needed

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
