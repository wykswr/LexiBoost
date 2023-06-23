const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    name: String,
    cover: String,
    description: String,
    rating: Number,
    size: Number,
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    is_public: Boolean,
    import_count: Number,
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_modification_date: Date
});

module.exports = mongoose.model('Deck', deckSchema);
