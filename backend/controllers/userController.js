// userController.js
const UserModel = require('../models/userModel');

// Example controller function
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

module.exports = {getUsers};
