// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Example route
router.post('/login', userController.loginUser);
router.post('/signup', userController.createUser);
router.get('/', verifyToken, userController.getUser);
router.put('/', verifyToken, userController.editUser);

module.exports = router;
