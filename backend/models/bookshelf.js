const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    },
    correct: Number,
    wrong: Number,
    deck_mastered: Boolean
});

module.exports = mongoose.model('BookshelfEntry', bookshelfSchema);
