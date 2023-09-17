const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validate = require('../middleware/schemaValidation');
const { createUser, updateUser } = require('../schema/validation/userSchema');

// Create a new user
router.post('/',validate(createUser), usersController.createUser);

// Retrieve all users
router.get('/', usersController.getAllUsers);

// Retrieve a specific user by ID
router.get('/:id', usersController.getUserById);

// Update a user by ID
router.put('/:id', validate(updateUser), usersController.updateUser);

// Delete a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
