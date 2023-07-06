// connect to mongo
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../utils/tokenUtil');

// Define the user schema
const userSchema = new mongoose.Schema({
  creationDate: {type: Date, required: true},
  authToken: {type: String},
  email: {type: String},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String},
  password: {type: String},
  avatar: {type: String}, // Assuming the avatar is stored as a file path or URL
  decks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Deck'}],
});

userSchema.statics.createUser =
    async function(firstName, lastName, email, password) {
      try {
        const newUser = new this({
          creationDate: new Date(),
          email,
          firstName,
          lastName,
          password: await bcrypt.hash(password, 10),
          decks: [],
        });

        const user = await newUser.save();

        user.authToken = generateAuthToken(user.id);
        await user.save();

        return user;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error);
      }
    };

userSchema.statics.loginUser = async function(email, password) {
  try {
    const user = await User.findOne({email});
    if (!user) {
      throw new Error('User does not exists');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Invalid password
      throw new Error('Invalid password');
    }

    const authToken = generateAuthToken();

    // Update the user's auth_token in the database
    Object.assign(user, {authToken});
    await user.save();

    return user.authToken;
  } catch (error) {
    console.error('Error login user:', error);
    throw new Error('Failed to login user');
  }
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
