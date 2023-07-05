// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Example route
router.get('/users/login', userController.loginUser);
router.get('/users/signup', userController.createUser);

module.exports = router;
