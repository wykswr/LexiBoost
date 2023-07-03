const mongoose = require('mongoose');

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
 * @returns {Promise<Deck>} A Promise that resolves to the created deck.
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
 * @returns {Deck[]} Array of user decks.
 * @throws {Error} If failed to retrieve the user decks.
 */
deckSchema.statics.getUserDecks = async function(userId) {
  try {
    const decks = await this.find({
      creatorId: userId,
      inBookshelf: true,
    });

    return decks;
  } catch (error) {
    console.error('Error retrieving user decks:', error);
    throw new Error('Failed to retrieve user decks');
  }
};

/**
 * Edits an existing deck by updating the provided fields.
 *
 * @param {string} deckId - The ID of the deck to edit.
 * @param {object} updatedFields - The fields to update.
 * @param {number} userId - The ID of the authenticated user.
 * @returns {Deck} Edited deck object.
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
        if (deck.creatorId !== userId) {
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
 * @returns {Deck} Imported cloned deck.
 * @throws {Error} If failed to clone the deck.
 */
deckSchema.statics.importDeck = async function(deckId, creatorId) {
  try {
    const originalDeck = await this.findById(deckId);

    if (!originalDeck) {
      throw new Error('Deck not found');
    }

    // Check if the user has imported the deck
    const alreadyImported = await this.exists({
      creatorId,
      parentDeckId: deckId,
    });
    if (alreadyImported) {
      throw new Error('Deck has already been imported by the user');
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
    console.error('Error cloning deck:', error);
    throw new Error('Failed to clone deck');
  }
};

/**
 * Publishes a deck, making it publicly available.
 *
 * @param {string} deckId - The ID of the deck to publish.
 * @param {number} userId - The ID of the authenticated user.
 * @returns {Deck} Published deck.
 * @throws {Error} If failed to publish the deck.
 */
deckSchema.statics.publishDeck = async function(deckId, userId) {
  try {
    const deck = await this.findById(deckId);

    if (!deck) {
      throw new Error('Deck not found');
    }

    // Check if the authenticated user is the creator of the deck
    if (deck.creatorId !== userId) {
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
 * @returns {boolean} True if the deck is successfully deleted from
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
    if (deck.creatorId !== userId) {
      throw new Error('Only the deck creator can delete the deck ' +
                'from the marketplace');
    }

    // Delete the deck from the marketplace by setting isPublic to false
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
 * @returns {boolean} True if the deck is successfully deleted
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
    if (deck.creatorId !== userId) {
      throw new Error('Only the deck creator can delete the deck ' +
                'from the bookshelf');
    }

    // Delete the deck from the bookshelf by setting inBookshelf to false
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
 * @returns {boolean} True if the deck is successfully deleted, otherwise false.
 * @throws {Error} If failed to delete the deck from the bookshelf.
 */
deckSchema.statics.deleteDeckCompletely = async function(deckId, userId) {
  try {
    const deck = await Deck.findById(deckId);
    if (!deck) {
      throw new Error('Deck not found');
    }
    // Check if the authenticated user is the creator of the deck
    if (deck.creatorId !== userId) {
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
 * @returns {boolean} True if the deck is successfully deleted, otherwise false.
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
    if (deck.creatorId !== userId) {
      throw new Error('Only the deck creator can edit the flashcard');
    }

    // Find the flashcard index
    const flashcardIndex =
        deck.flashCards.findIndex((flashcard) => flashcard.id === flashcardId);

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
 * @returns {boolean} True if the deck is successfully deleted, otherwise false.
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
    if (deck.creatorId !== userId) {
      throw new Error('Only the deck creator can edit the flashcard');
    }
    // Find the flashcard index
    const flashcardIndex =
        deck.flashCards.findIndex((flashcard) => flashcard.id === flashcardId);

    // Update the flashcard in the deck
    if (flashcardIndex !== -1) {
      const updatedFlashCardWithNewFields = { ...deck, ...updatedFlashcard };
      deck.flashCards[flashcardIndex] = updatedFlashCardWithNewFields;
      await deck.save();
    } else {
      throw new Error('Flashcard not found in the deck');
    }
  } catch (error) {
    console.error('Error updating flashcard in deck:', error);
    throw error;
  }
};

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;
