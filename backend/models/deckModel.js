const mongoose = require("mongoose");

const flashCardSchema = new mongoose.Schema({
    spelling: {
        type: String,
        required: false,
        default: "",
    },
    pronunciation: {
        type: String,
        required: false,
        default: "",
    },
    definition: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: 'At least one definition is required',
        },
    },
    examples: {
        type: [String],
        required: false,
        default: [],
    },
    burnt: {
        type: Boolean,
        required: false,
        default: false,
    },
    mistakeCount: {
        type: Number,
        required: false,
        default: 0,
    },
    correctCount: {
        type: Number,
        required: false,
        default: 0,
    },
});

const deckSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        size: {
            type: Number,
            default: 0,
        },
        /**
         * Commented out for testing. creatorId is required
         */
        // creatorId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        // },
        creatorId: Number,
        isPublic: {
            type: Boolean,
            default: false,
        },
        importCount: {
            type: Number,
            default: 0,
        },
        creationDate: {
            type: Date,
            default: Date.now,
        },
        lastModificationDate: {
            type: Date,
            default: Date.now,
        },
        flashCards: {
            type: [flashCardSchema],
            validate: {
                validator: function (value) {
                    // Check each element of the array against the flashCardSchema
                    return value.every((card) => card instanceof mongoose.Document);
                },
                message: 'Invalid flashCards array',
            },
        },
        tags: {
            type: [String],
            required: false,
            default: [],
        },
        /**
         * Todo: Add a way to track user study time on the deck
         */
        // startTime: Date,
        // endTime: Date,
    },
    {
        versionKey: false, // Exclude the __v field from the response
    }
);

deckSchema.statics.createDeck = async function (deckData) {
    try {
        const deck = new this(deckData);
        await deck.save();
        return deck;
    } catch (error) {
        console.error("Error creating deck:", error);
        throw new Error("Failed to create deck");
    }
};

/**
 * Edit an existing deck by updating the provided fields.
 *
 * @param {string} deckId - The ID of the deck to edit.
 * @param {object} updatedFields - The fields to update.
 * @returns {Promise<object>} A Promise that resolves to the edited deck object.
 */
deckSchema.statics.editDeck = async function editDeck(deckId, updatedFields) {
    try {
        const deck = await Deck.findById(deckId);

        if (!deck) {
            throw new Error("Deck not found");
        }

        Object.assign(deck, updatedFields);
        deck.lastModificationDate = new Date();
        await deck.save();

        return deck;
    } catch (error) {
        console.error("Error editing deck:", error);
        throw new Error("Failed to edit deck");
    }
};

deckSchema.statics.importDeck = async function (deckId, creatorId) {
    try {
        const originalDeck = await this.findById(deckId);

        if (!originalDeck) {
            throw new Error("Deck not found");
        }

        originalDeck.importCount += 1;

        const clonedDeck = new this({
            ...originalDeck.toObject({
                transform: (doc, ret) => {
                    // Exclude _id field from the transformation
                    delete ret._id;
                    return ret;
                },
            }),
            creationDate: new Date(),
            lastModificationDate: new Date(),
            isPublic: false,
            importCount: 0,
            flashCards: originalDeck.flashCards.map((card) => ({
                ...card.toObject(),
                burnt: false,
                mistakeCount: 0,
                correctCount: 0,
            })),
            creatorId,
        });

        await Promise.all([clonedDeck.save(), originalDeck.save()]);
        return clonedDeck;
    } catch (error) {
        console.error("Error cloning deck:", error);
        throw new Error("Failed to clone deck");
    }
};

deckSchema.statics.publishDeck = async function (deckId, userId) {
    try {
        const deck = await this.findById(deckId);

        if (!deck) {
            throw new Error("Deck not found");
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error("Only the deck creator can publish the deck");
        }

        deck.isPublic = true;
        deck.lastModificationDate = new Date();
        await deck.save();
        return deck;
    } catch (error) {
        console.error("Error publishing deck:", error);
        throw new Error("Failed to publish deck");
    }
};
const Deck = mongoose.model("Deck", deckSchema)
module.exports = Deck;
