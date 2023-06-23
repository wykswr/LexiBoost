// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatar: String,
    name: String,
    email_address: {
        type: String,
        required: true,
        unique: true
    },
    subscription_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    creation_date: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
