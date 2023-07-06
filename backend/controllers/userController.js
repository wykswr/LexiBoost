const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({error: 'All fields are required'});
    }

    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({error: 'User already exists'});
    }
    // Create the new user
    const user = await User.createUser(firstName, lastName, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({error: 'Failed to create user'});
  }
};

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({error: 'All fields are required'});
    }

    const token = await User.loginUser(email, password);

    res.status(200).json({token: token});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = {
  createUser,
  loginUser,
};
