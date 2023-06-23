const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
    deck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    front: String,
    explanation: String
});

module.exports = mongoose.model('FlashCard', flashCardSchema);
