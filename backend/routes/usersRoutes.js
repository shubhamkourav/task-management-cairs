const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Create a new user
router.post('/', usersController.createUser);

// Retrieve all users
router.get('/', usersController.getAllUsers);

// Retrieve a specific user by ID
router.get('/:id', usersController.getUserById);

// Update a user by ID
router.put('/:id', usersController.updateUser);

// Delete a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
