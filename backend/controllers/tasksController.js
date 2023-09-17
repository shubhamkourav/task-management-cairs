const Task = require('../models/Tasks');
const User = require('../models/Users');


// Function to handle server errors and send a 500 Internal Server Error response
const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  };

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, user: userId } = req.body;
    // Check if the user exists (you should handle this validation as needed)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const task = new Task({ title, description, user: userId });
    await task.save();
    task.user= user
    res.status(201).json(task); // HTTP status 201 (Created)
  } catch (error) {
    handleServerError(res, error);
  }
};

// Retrieve all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('user');
    res.status(200).json(tasks); // HTTP status 200 (OK)
  } catch (error) {
    handleServerError(res, error);
  }
};

// Retrieve a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task) {
      res.status(404).json({ error: 'Task not found' }); // HTTP status 404 (Not Found)
    } else {
      res.status(200).json(task); // HTTP status 200 (OK)
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const exixtsUser = await User.findById(user);
    if (!exixtsUser) {
      return res.status(400).json({ error: 'User not found' });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, user }, { new: true }).populate('user');
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json(task); // HTTP status 200 (OK)
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' }); // HTTP status 200 (OK)
    }
  } catch (error) {
    handleServerError(res, error);
  }
};
