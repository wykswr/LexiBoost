const mongoose = require('mongoose');
const User = require('./userModel');

const flashCardSchema = new mongoose.Schema({
    spelling: {
        type: String,
        required: false,
        default: '',
    },
    pronunciation: {
        type: String,
        required: false,
        default: '',
    },
    definition: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
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
        totalRating: {
            type: Number,
            default: 0,
        },
        ratingCount: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        size: {
            type: Number,
            default: 0,
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
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
                validator: function(value) {
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
        parentDeckId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Deck',
            default: null,
        },
        inBookshelf: {
            type: Boolean,
            default: true,
        },
    },
    {
        versionKey: false, // Exclude the __v field from the response
    },
);

/**
 * Creates a new deck with the provided deck data.
 *
 * @param {Deck} deckData - The data for the new deck.
 * @return {Promise<Deck>} A Promise that resolves to the created deck.
 * @throws {Error} If failed to create the deck.
 */
deckSchema.statics.createDeck = async function(deckData) {
    try {
        const deck = new this(deckData);
        await deck.save();
        return deck;
    } catch (error) {
        console.error('Error creating deck:', error);
        throw new Error('Failed to create deck');
    }
};

/**
 * Retrieves the decks of the specified user from the bookshelf.
 *
 * @param {number} userId - The ID of the user.
 * @return {Deck[]} Array of user decks.
 * @throws {Error} If failed to retrieve the user decks.
 */
deckSchema.statics.getUserDecks = async function(userId) {
    try {
        const decks = await this.aggregate([
            {
                $match: {
                    creatorId: new mongoose.Types.ObjectId(userId),
                    inBookshelf: true,
                },
            },
            {
                $project: {
                    document: '$$ROOT',
                    flashCards: {
                        $filter: {
                            input: '$flashCards',
                            as: 'flashcard',
                            cond: {$eq: ['$$flashcard.burnt', false]},
                        },
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$document', {flashCards: '$flashCards'}],
                    },
                },
            },
        ]);

        decks.forEach((deck) => {
            deck.flashCards.sort((a, b) => {
                const scoreA = a.correctCount + 2 * a.mistakeCount;
                const scoreB = b.correctCount + 2 * b.mistakeCount;
                return scoreB - scoreA;
            });
        });

        return decks;
    } catch (error) {
        console.error('Error retrieving user decks:', error);
        throw new Error('Failed to retrieve user decks');
    }
};

/**
 * Retrieves all the decks of the specified user from the bookshelf.
 *
 * @param {number} userId - The ID of the user.
 * @return {Deck[]} Array of user decks.
 * @throws {Error} If failed to retrieve the user decks.
 */
deckSchema.statics.getAllUserDecks = async function(userId) {
    try {
        const decks = await this.aggregate([
            {
                $match: {
                    creatorId: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $project: {
                    document: '$$ROOT',
                    flashCards: {
                        $filter: {
                            input: '$flashCards',
                            as: 'flashcard',
                            cond: {$eq: ['$$flashcard.burnt', false]},
                        },
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$document', {flashCards: '$flashCards'}],
                    },
                },
            },
        ]);

        decks.forEach((deck) => {
            deck.flashCards.sort((a, b) => {
                const scoreA = a.correctCount + 2 * a.mistakeCount;
                const scoreB = b.correctCount + 2 * b.mistakeCount;
                return scoreB - scoreA;
            });
        });

        return decks;
    } catch (error) {
        console.error('Error retrieving all user decks:', error);
        throw new Error('Failed to retrieve all user decks');
    }
};

/**
 * Edits an existing deck by updating the provided fields.
 *
 * @param {string} deckId - The ID of the deck to edit.
 * @param {object} updatedFields - The fields to update.
 * @param {number} userId - The ID of the authenticated user.
 * @return {Deck} Edited deck object.
 * @throws {Error} If failed to edit the deck.
 */
deckSchema.statics.editDeck =
    async function editDeck(deckId, updatedFields, userId) {
        try {
            const deck = await this.findById(deckId);

            if (!deck) {
                throw new Error('Deck not found');
            }
            // Check if the authenticated user is the creator of the deck
            if (deck.creatorId.toString() !== userId) {
                throw new Error('Only the deck creator can edit the deck');
            }

            Object.assign(deck, updatedFields);
            deck.lastModificationDate = new Date();
            await deck.save();

            return deck;
        } catch (error) {
            console.error('Error editing deck:', error);
            throw new Error('Failed to edit deck');
        }
    };

/**
 * Imports a deck by cloning it and associating it with the specified user.
 *
 * @param {string} deckId - The ID of the deck to import.
 * @param {number} creatorId - The ID of the user who imports the deck.
 * @return {Deck} Imported cloned deck.
 * @throws {Error} If failed to clone the deck.
 */
deckSchema.statics.importDeck = async function(deckId, creatorId) {
    try {
        const originalDeck = await this.findById(deckId);

        if (!originalDeck) {
            throw new Error('Deck not found');
        }

        if (!originalDeck.isPublic) {
            throw new Error('Cannot import private deck');
        }

        // Check if the user has imported the deck
        const alreadyImported = await this.exists({
            creatorId,
            _id: deckId,
        });

        if (alreadyImported) {
            throw new Error('Deck has already been imported by the user');
        }

        originalDeck.importCount += 1;
        originalDeck.lastModificationDate = new Date();

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
            parentDeckId: deckId,
        });

        await Promise.all([clonedDeck.save(), originalDeck.save()]);
        return clonedDeck;
    } catch (error) {
        console.error('Error cloning deck:', error);
        throw new Error('Failed to clone deck');
    }
};

/**
 * Publishes a deck, making it publicly available.
 *
 * @param {string} deckId - The ID of the deck to publish.
 * @param {number} userId - The ID of the authenticated user.
 * @return {Deck} Published deck.
 * @throws {Error} If failed to publish the deck.
 */
deckSchema.statics.publishDeck = async function(deckId, userId) {
    try {
        const deck = await this.findById(deckId);

        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can publish the deck');
        }

        deck.isPublic = true;
        deck.lastModificationDate = new Date();
        await deck.save();
        return deck;
    } catch (error) {
        console.error('Error publishing deck:', error);
        throw new Error('Failed to publish deck');
    }
};

/**
 * Deletes a deck from the marketplace by setting isPublic to false.
 *
 * @param {string} deckId - The ID of the deck to delete from the marketplace.
 * @param {number} userId - The ID of the authenticated user.
 * @return {boolean} True if the deck is successfully deleted from
 * the marketplace, otherwise false.
 * @throws {Error} If failed to delete the deck from the marketplace.
 */
deckSchema.statics.deleteDeckFromMarketplace = async function(deckId, userId) {
    try {
        const deck = await this.findById(deckId);

        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can delete the deck ' +
                'from the marketplace');
        }

        // SoftDelete the deck from the marketplace by setting isPublic to false
        deck.isPublic = false;
        deck.lastModificationDate = new Date();
        await deck.save();

        return true;
    } catch (error) {
        console.error('Error deleting deck from marketplace:', error);
        throw new Error('Failed to delete deck from marketplace');
    }
};

/**
 * Deletes a deck from the bookshelf.
 *
 * @param {string} deckId - The ID of the deck to delete from the bookshelf.
 * @param {number} userId - The ID of the authenticated user.
 * @return {boolean} True if the deck is successfully deleted
 * from the bookshelf, otherwise false.
 * @throws {Error} If failed to delete the deck from the bookshelf.
 */
deckSchema.statics.deleteDeckFromBookshelf = async function(deckId, userId) {
    try {
        const deck = await this.findById(deckId);

        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can delete the deck ' +
                'from the bookshelf');
        }

        // SoftDelete the deck from the bookshelf by setting inBookshelf to false
        deck.inBookshelf = false;
        deck.lastModificationDate = new Date();
        await deck.save();

        return true;
    } catch (error) {
        console.error('Error deleting deck from bookshelf:', error);
        throw new Error('Failed to delete deck from bookshelf');
    }
};

/**
 * Deletes a deck completely.
 *
 * @param {string} deckId - The ID of the deck to delete from the bookshelf.
 * @param {number} userId - The ID of the authenticated user.
 * @return {boolean} True if the deck is successfully deleted, otherwise false.
 * @throws {Error} If failed to delete the deck from the bookshelf.
 */
deckSchema.statics.deleteDeckCompletely = async function(deckId, userId) {
    try {
        const deck = await Deck.findById(deckId);
        if (!deck) {
            throw new Error('Deck not found');
        }
        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can delete the deck');
        }
        await this.deleteOne({_id: deckId, creatorId: userId});

        return true;
    } catch (error) {
        console.error('Error deleting deck completely:', error);
        throw new Error('Failed to delete deck completely');
    }
};

/**
 * Deletes a flashcard from deck completely.
 *
 * @param {string} deckId - The ID of the deck to delete from the bookshelf.
 * @param {number} userId - The ID of the authenticated user.
 * @return {boolean} True if the deck is successfully deleted, otherwise false.
 * @throws {Error} If failed to delete the deck from the bookshelf.
 */
deckSchema.statics.deleteFlashcardFromDeck = async function(deckId,
                                                            flashcardId,
                                                            userId) {
    try {
        const deck = await Deck.findById(deckId);

        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can edit the flashcard');
        }

        // Find the flashcard index
        const flashcardIndex =
            deck.flashCards
                .findIndex((flashcard) => flashcard.id === flashcardId);

        // Remove the flashcard from the deck
        if (flashcardIndex !== -1) {
            deck.flashCards.splice(flashcardIndex, 1);
            deck.size = deck.flashCards.length;
            await deck.save();
        } else {
            throw new Error('Flashcard not found in the deck');
        }
    } catch (error) {
        console.error('Error deleting flashcard from deck:', error);
        throw error;
    }
};
/**
 * Updates a flashcard in a deck.
 *
 * @param {string} deckId - The ID of the deck to delete from the bookshelf.
 * @param {number} flashcardId - The ID of the flashcardId.
 * @param {object} updatedFlashcard - The updated flashcard.
 * @return {boolean} True if the deck is successfully deleted, otherwise false.
 * @throws {Error} If failed to delete the deck from the bookshelf.
 */
deckSchema.statics.editFlashcardInDeck = async function(deckId,
                                                        flashcardId,
                                                        updatedFlashcard,
                                                        userId) {
    try {
        const deck = await Deck.findById(deckId);
        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can edit the flashcard');
        }
        // Find the flashcard index
        const flashcardIndex =
            deck.flashCards
                .findIndex((flashcard) => flashcard.id === flashcardId);


        // Update the flashcard in the deck
        if (flashcardIndex !== -1) {
            const oldFlashCard = deck.flashCards[flashcardIndex];
            Object.assign(oldFlashCard, updatedFlashcard);
            deck.flashCards[flashcardIndex] = oldFlashCard;
            await deck.save();
        } else {
            throw new Error('Flashcard not found in the deck');
        }
    } catch (error) {
        console.error('Error updating flashcard in deck:', error);
        throw error;
    }
};

deckSchema.statics.appendFlashCardToDeck = async function(deckId,
                                                          flashCard,
                                                          userId) {
    const deck = await this.findById(deckId);

    if (!deck) {
        throw new Error('Deck not found');
    }
    // Check if the authenticated user is the creator of the deck
    if (deck.creatorId.toString() !== userId) {
        throw new Error('Only the deck creator can append flashcard to deck');
    }

    deck.flashCards.push(flashCard);
    await deck.save();

    return deck;
};

/**
 * Retrieves filtered and sorted flashcards for a deck.
 *
 * @param {string} deckId - The ID of the deck.
 * @return {Array} Array of filtered and sorted flashcards.
 * @throws {Error} If failed to retrieve the flashcards.
 */
deckSchema.statics.getFilteredAndSortedFlashcards = async function(deckId, userId) {
    try {
        const deck = await this.findById(deckId);

        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('No access');
        }

        // Filter the flashcards by burnt = false
        const filteredFlashcards = deck.flashCards.filter((flashcard) => !flashcard.burnt);

        // Sort the filtered flashcards based on the score
        const sortedFlashcards = filteredFlashcards.sort((a, b) => {
            const scoreA = a.correctCount + 2 * a.mistakeCount;
            const scoreB = b.correctCount + 2 * b.mistakeCount;
            return scoreB - scoreA;
        });

        return sortedFlashcards;
    } catch (error) {
        console.error('Error retrieving flashcards:', error);
        throw new Error('Failed to retrieve flashcards');
    }
};

/**
 * Retrieves a flashcard from a deck by its ID.
 *
 * @param {string} deckId - The ID of the deck.
 * @param {string} flashcardId - The ID of the flashcard.
 * @return {Object|null} The flashcard object if found, or null if not found.
 * @throws {Error} If failed to retrieve the flashcard.
 */
deckSchema.statics.getFlashcardById = async function(deckId, flashcardId, userId) {
    try {
        const deck = await this.findById(deckId);

        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can fetch the flashcard');
        }

        const flashcard = deck.flashCards.find((card) => card.id === flashcardId);

        if (!flashcard || flashcard.burnt || !deck.inBookshelf) {
            return null; // Flashcard not found
        }

        return flashcard;
    } catch (error) {
        console.error('Error retrieving flashcard:', error);
        throw new Error('Failed to retrieve flashcard');
    }
};

/**
 * Retrieves user statistics about a deck.
 *
 * @param {string} deckId - The ID of the deck.
 * @return {Object} An object containing the statistics: { burntCardNumber: number, totalCardNumber: number }.
 * @throws {Error} If failed to retrieve the statistics.
 */
deckSchema.statics.getUserDeckStatistics = async function(deckId, userId) {
    try {
        const deck = await this.findById(deckId);

        if (!deck) {
            throw new Error('Deck not found');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can get the deck statistics');
        }
        // Count the number of burnt cards
        const burntCardNumber = deck.flashCards.reduce((count, flashcard) => {
            if (flashcard.burnt) {
                return count + 1;
            }
            return count;
        }, 0);

        // Get the total number of cards in the deck
        const totalCardNumber = deck.flashCards.length;

        return {
            burntCardNumber,
            totalCardNumber,
        };
    } catch (error) {
        console.error('Error retrieving deck statistics:', error);
        throw new Error('Failed to retrieve deck statistics');
    }
};

deckSchema.statics.addRatingToDeck = async function addRatingToDeck(deckId, userId, rating) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        let deck = await Deck.findById(deckId);
        if (!deck) {
            throw new Error('Deck not found.');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only if you imported the deck you can add ratings');
        }

        if (deck.parentDeckId != null) {
            deck = await Deck.findById(deck.parentDeckId);
        }

        // Check if the user has already rated this deck
        const existingRatingIndex = user.ratings.findIndex((r) => r.deckId.equals(deckId));

        if (existingRatingIndex !== -1) {
            // If the user has already rated, update their previous rating
            deck.totalRating -= user.ratings[existingRatingIndex].rating;
            deck.totalRating += rating;
            user.ratings[existingRatingIndex].rating = rating;
        } else {
            // If the user hasn't rated this deck before, add a new rating entry
            user.ratings.push({deckId, rating});
            deck.totalRating += rating;
            deck.ratingCount += 1;
        }

        await user.save();

        if (deck.ratingCount > 0) {
            deck.rating = deck.totalRating / deck.ratingCount;
        } else {
            deck.rating = 0;
        }

        const ratedDeck = await deck.save();

        return ratedDeck;
    } catch (error) {
        throw new Error(error.message);
    }
};

deckSchema.statics.getDeckRating = async function getDeckRating(deckId, userId) {
    try {
        const deck = await Deck.findById(deckId);
        if (!deck) {
            throw new Error('Deck not found.');
        }

        // Check if the authenticated user is the creator of the deck
        if (deck.creatorId.toString() !== userId) {
            throw new Error('Only the deck creator can fetch the flashcard');
        }

        return deck.rating;
    } catch (error) {
        throw new Error('Failed to get the deck rating.');
    }
};
deckSchema.statics.searchPublicDecks = async function(
    deckName,
    tags = [],
    startingPage = 0,
    sortMethod = 'rating',
) {
    try {
        const pageSize = 16; // Number of decks to return per page

        // Step 1: Filter all public decks with tags
        let match = {
            isPublic: true,
        };

        if (tags && tags.length > 0) {
            match.tags = [...tags];
        }

        if (deckName) {
            match = {...match, name: deckName};
        }

        const pipeline = [
            {$match: match},
            {$sort: {relevance: -1}},
        ];

        // Step 3: Do the second sort by the sort method
        if (sortMethod === 'rating') {
            pipeline.push({$sort: {rating: -1}});
        } else if (sortMethod === 'recent') {
            pipeline.push({$sort: {creationDate: -1}});
        } else if (sortMethod === 'card number') {
            pipeline.push({$sort: {size: -1}});
        }

        const countPipeline = [ // Create a separate pipeline to get the count
            {$match: match},
            {$count: 'total'},
        ];

        // Step 2: Use $facet to run both pipelines in parallel
        const result = await this.aggregate([
            {
                $facet: {
                    decks: pipeline.concat([{$skip: pageSize * startingPage}, {$limit: pageSize}]),
                    count: countPipeline,
                },
            },
        ]);

        // Extract the decks and total count from the result
        const decks = result[0].decks;
        const totalCount = result[0].count.length > 0 ? result[0].count[0].total : 0;
        const totalPages = Math.ceil(totalCount / pageSize);

        // Prepare the response object
        const response = {
            decks,
            totalPages,
        };

        return response;
    } catch (error) {
        console.error('Error searching public decks:', error);
        throw new Error('Failed to search public decks');
    }
};


const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;
