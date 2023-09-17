const User = require('../models/Users');

// Function to handle server errors and send a 500 Internal Server Error response
const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user); // 201 Created - User successfully created
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ error: 'Email address is already in use.' }); // 400 Bad Request - Duplicate email
    }
    handleServerError(res, error);
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // 200 OK - Successfully retrieved users
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // 404 Not Found - User not found
    }
    res.status(200).json(user); // 200 OK - Successfully retrieved the user
  } catch (error) {
    handleServerError(res, error);
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // 404 Not Found - User not found
    }
    res.status(200).json(user); // 200 OK - Successfully updated the user
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // 404 Not Found - User not found
    }
    res.status(204).json(); // 204 No Content - User deleted successfully (no response body)
  } catch (error) {
    handleServerError(res, error);
  }
};
