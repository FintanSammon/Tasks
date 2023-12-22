const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:Buddy123@cluster0.zupcoct.mongodb.net/TaskManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));



// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: String,
  userUID: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);





// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userUID: req.body.userUID
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const userUID = req.query.userUID;
    const tasks = await Task.find({ userUID });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a task by ID
app.put('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a task by ID
app.delete('/api/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));