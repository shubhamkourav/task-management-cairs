const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const validate = require('../middleware/schemaValidation');
const { createTask, updateTask } = require('../schema/validation/taskValidation');

// Create a new task
router.post('/',validate(createTask), tasksController.createTask);

// Retrieve all tasks
router.get('/', tasksController.getAllTasks);

// Retrieve a specific task by ID
router.get('/:id', tasksController.getTaskById);

// Update a task by ID
router.put('/:id',validate(updateTask), tasksController.updateTask);

// Delete a task by ID
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
