const User = require('../models/userModel');
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({error: 'All fields are required'});
        }

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({error: 'User already exists'});
        }
        console.log("Im before create User")

        // Create the new user
        const user = await User.createUser(first_name, last_name, email, password);
        console.log("Im after create User")
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
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({error: 'User does not exists'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Invalid password
            return res.status(401).json({error: 'Invalid password'});
        }

        res.status(200).json({token: user.auth_token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {avatar, name, email_address} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {avatar, name, email_address},
            {new: true}
        );

        if (!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,

};
