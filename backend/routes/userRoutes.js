const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Create a new user (user sign up)
router.post('/signup', UserController.createUser);

// Log in a user
router.post('/login', UserController.loginUser);

// Get all users
router.get('/signup', UserController.getUsers);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
