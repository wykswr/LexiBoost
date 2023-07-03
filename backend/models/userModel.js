// userModel.js
const mongoose = require('mongoose');

// User model schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Other fields
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
