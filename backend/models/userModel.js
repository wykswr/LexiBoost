// connect to mongo
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/tokenUtil');

// Define the user schema
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    creation_date: { type: Date, required: true },
    auth_token: { type: String },
    email: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    avatar: { type: String }, // Assuming the avatar is stored as a file path or URL
    decks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
});

userSchema.statics.createUser = async function (first_name, last_name, email, password) {
    try {
        const newUser = new this({
            id: uuid(),
            creation_date: new Date(),
            email,
            first_name,
            last_name,
            password: await bcrypt.hash(password, 10),
            decks: [],
        });

        const user = await newUser.save();

        const token = generateAuthToken();
        user.auth_token = token;
        await user.save();

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error);
    }
};

userSchema.statics.loginUser = async function ( email, password) {
    try {
        const user = await User.findOne({ email });

        const authToken = generateAuthToken();

        // Update the user's auth_token in the database
        user.auth_token = authToken;
        await user.save();


        return user.auth_token;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;