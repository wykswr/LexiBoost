// connect to mongo
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    creation_date: { type: Date, required: true },
    auth_token: { type: String, required: true },
    email: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    avatar: { type: String }, // Assuming the avatar is stored as a file path or URL
    decks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }]
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
