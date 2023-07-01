// userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Example route
router.get("/users", userController.getUsers);

module.exports = router;
