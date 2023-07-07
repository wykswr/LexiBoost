// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Example route
router.post('/login', userController.loginUser);
router.post('/signup', userController.createUser);

module.exports = router;
