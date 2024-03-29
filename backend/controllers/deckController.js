const Deck = require('../models/deckModel');

/**
 * Retrieves a deck by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getDeckById(req, res) {
    try {
        const deckId = req.params.deckId;
        const userId = req.user.id;

        if (!deckId) {
            return res.status(400).json({error: 'Malformed request'});
        }

        const deck = await Deck.findById(deckId);

        if (!deck) {
            return res.status(404).json({error: 'Deck not found'});
        }

        // if (deck.creatorId.toString() !== userId) {
        //     throw new Error('Only the deck creator can fetch the deck');
        // }

        res.json({deck});
    } catch (error) {
        console.error('Error retrieving deck:', error);
        res.status(500).json({error: 'Failed to retrieve deck'});
    }
}

/**
 * Retrieves user decks.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getUserDecks(req, res) {
    try {
        const userId = req.user.id;

        const decks = await Deck.getUserDecks(userId);

        if (!decks) {
            return res.status(404).json({error: 'Decks not found'});
        }

        res.json({decks});
    } catch (error) {
        console.error('Error retrieving user decks:', error);
        res.status(500).json({error: 'Failed to retrieve decks'});
    }
}

/**
 * Retrieves all user decks.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getAllUserDecks(req, res) {
    try {
        const userId = req.user.id;

        const decks = await Deck.getAllUserDecks(userId);

        if (!decks) {
            return res.status(404).json({error: 'Decks not found'});
        }

        res.json({decks});
    } catch (error) {
        console.error('Error retrieving all user decks:', error);
        res.status(500).json({error: 'Failed to retrieve all decks'});
    }
}

/**
 * Retrieves flashcards given a deckId.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getFlashCards(req, res) {
    try {
        const {deckId} = req.params;
        const userId = req.user.id;

        const flashcards = await Deck.getFilteredAndSortedFlashcards(deckId, userId);

        if (!flashcards) {
            return res.status(404).json({error: 'Flashcards not found'});
        }

        res.json({flashcards});
    } catch (error) {
        console.error('Error retrieving user decks:', error);
        res.status(500).json({error: 'Failed to retrieve decks'});
    }
}

/**
 * @api {post} /decks Create a new deck
 * @apiName createDeck
 * @apiGroup Deck
 *
 * @apiParam {String} name The name of the deck.
 * @apiParam {String} cover The cover image of the deck.
 * @apiParam {String} description The description of the deck.
 * @apiParam {Boolean} isPublic Whether the deck should be public.
 * @apiParam {Array} flashCards An array of flash cards for the deck.
 * @apiParam {Array} tags An array of tags for the deck.
 *
 * @apiSuccess (201) {Object} deck The created deck object.
 */
async function createDeck(req, res) {
    try {
        const {name, cover, description, isPublic, flashCards, tags} = req.body;
        const creatorId = req.user.id;

        const deckData = {
            name,
            cover,
            description,
            size: flashCards.length,
            creatorId: creatorId,
            isPublic,
            creationDate: new Date(),
            lastModificationDate: new Date(),
            flashCards,
            tags,
            // startTime: null,
            // endTime: null,
        };

        const deck = await Deck.createDeck(deckData);

        res.status(201).json({deck});
    } catch (error) {
        console.error('Error creating deck:', error);
        res.status(500).json({error: 'Failed to create deck'});
    }
}

/**
 * @api {put} /decks/:deckId DeckEdit an existing deck
 * @apiName editDeck
 * @apiGroup Deck
 *
 * @apiParam {String} deckId The ID of the deck to edit.
 * @apiParam {String} name The new name of the deck.
 * @apiParam {String} cover The new cover image of the deck.
 * @apiParam {String} description The new description of the deck.
 * @apiParam {Array} flashCards The new array of flash cards for the deck.
 * @apiParam {Array} tags The new array of tags for the deck.
 *
 * @apiSuccess {Object} deck The edited deck object.
 */
async function editDeck(req, res) {
    try {
        const deckId = req.params.deckId;
        const updatedFields = req.body;
        const userId = req.user.id;

        const deck = await Deck.editDeck(deckId, updatedFields, userId);

        res.json({deck});
    } catch (error) {
        console.error('Error editing deck:', error);
        res.status(500).json({error: 'Failed to edit deck'});
    }
}

/**
 * @api {post} /decks/:deckId/import Clone an existing deck
 * @apiName cloneDeck
 * @apiGroup Deck
 *
 * @apiParam {String} deckId The ID of the deck to clone.
 *
 * @apiSuccess (201) {Object} deck The cloned deck object.
 */
async function importDeck(req, res) {
    try {
        const deckId = req.params.deckId;
        const userId = req.user.id;

        const importedDeck = await Deck.importDeck(deckId, userId);

        res.status(201).json({importedDeck});
    } catch (error) {
        console.error('Error cloning deck:', error);
        res.status(500).json({error: 'Failed to clone deck'});
    }
}

/**
 * @api {post} /decks/:deckId/publish Publishes a deck in the marketplace
 * @apiName publishDeck
 * @apiGroup Deck
 *
 * @apiParam {String} deckId The ID of the deck to publish.
 *
 * @apiSuccess {Object} deck The published deck object.
 */
async function publishDeck(req, res) {
    try {
        const deckId = req.params.deckId;
        const userId = req.user.id;

        const deck = await Deck.publishDeck(deckId, userId);

        res.json({deck});
    } catch (error) {
        console.error('Error publishing deck:', error);
        res.status(500).json({error: 'Failed to publish deck'});
    }
}

/**
 * @api {post} /decks/:deckId/flashcards Appends a flashCard to a deck
 * @apiName flashcards
 * @apiGroup Deck
 *
 * Appends a flash card to a deck.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function appendFlashCardToDeck(req, res) {
    try {
        const deckId = req.params.deckId;
        const flashCard = req.body;
        const userId = req.user.id;

        const deck = await Deck.appendFlashCardToDeck(deckId, flashCard, userId);

        res.json({deck});
    } catch (error) {
        console.error('Error appending flash card to deck:', error);
        res.status(500).json({error: 'Failed to append flash card to deck'});
    }
}

/**
 * @api {delete} /decks/:deckId/flashcards/:flashCardId
 * Deletes a flashCard from a deck
 * @apiName flashcards
 * @apiGroup Deck
 *
 * Deletes a flashCard from a deck.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function deleteFlashcardFromDeck(req, res) {
    try {
        const {deckId, flashCardId} = req.params;
        const userId = req.user.id;

        await Deck.deleteFlashcardFromDeck(deckId, flashCardId, userId);

        res.json({success: true});
    } catch (error) {
        console.error('Error deleting deck:', error);
        res.status(500).json({error: 'Failed to delete deck'});
    }
}

/**
 * @api {put} /decks/:deckId/flashcards/:flashCardId
 * Edits a flashCard from a deck
 * @apiName flashcards
 * @apiGroup Deck
 *
 * Updates a flashCard in a deck.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function editFlashcardInDeck(req, res) {
    try {
        const {deckId, flashCardId} = req.params;
        const userId = req.user.id;
        const updatedFlashCard = req.body;

        await Deck.editFlashcardInDeck(deckId,
            flashCardId,
            updatedFlashCard,
            userId);

        res.json({success: true});
    } catch (error) {
        console.error('Error editing flashcard in deck:', error);
        res.status(500).json({error: 'Failed to edit flashcard'});
    }
}

/**
 * @api {get} /decks/:deckId/flashcards/:flashCardId
 * Get a flashCard from a deck
 * @apiName flashcards
 * @apiGroup Deck
 *
 * Get a flashCard from a deck.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getAFlashCardFromADeck(req, res) {
    try {
        const {deckId, flashCardId} = req.params;
        const userId = req.user.id;

        const flashCard = await Deck.getFlashcardById(deckId,
            flashCardId,
            userId);

        res.json({flashCard});
    } catch (error) {
        console.error('Error editing flashcard in deck:', error);
        res.status(500).json({error: 'Failed to edit flashcard'});
    }
}

/**
 * @api {get} /decks/:deckId/statistics
 * Get a deck statistics
 * @apiName statistics
 * @apiGroup Deck
 *
 * Get a deck statistics
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getDeckStats(req, res) {
    try {
        const {deckId} = req.params;
        const userId = req.user.id;

        const stats = await Deck.getUserDeckStatistics(deckId, userId);

        res.json({stats});
    } catch (error) {
        console.error('Error editing flashcard in deck:', error);
        res.status(500).json({error: 'Failed to edit flashcard'});
    }
}

/**
 * @api {delete} /decks/:deckId/marketplace Deletes a deck from the marketplace
 * @apiName deleteDeckFromMarketplace
 * @apiGroup Deck
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function deleteDeckFromMarketplace(req, res) {
    try {
        const {deckId} = req.params;
        const userId = req.user.id;

        await Deck.deleteDeckFromMarketplace(deckId, userId);

        res.json({success: true});
    } catch (error) {
        console.error('Error deleting deck from marketplace:', error);
        res.status(500).json({error: 'Failed to delete deck from marketplace'});
    }
}

/**
 * @api {delete} /decks/:deckId/bookshelf Deletes a deck from the bookshelf
 * @apiName deleteDeckFromBookshelf
 * @apiGroup Deck
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function deleteDeckFromBookshelf(req, res) {
    try {
        const {deckId} = req.params;
        const userId = req.user.id;

        await Deck.deleteDeckFromBookshelf(deckId, userId);

        res.json({success: true});
    } catch (error) {
        console.error('Error deleting deck from bookshelf:', error);
        res.status(500).json({error: 'Failed to delete deck from bookshelf'});
    }
}

/**
 * @api {delete} /decks/:deckId/ Deletes a deck completely
 * @apiName deleteDeckCompletely
 * @apiGroup Deck
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function deleteDeckCompletely(req, res) {
    try {
        const {deckId} = req.params;
        const userId = req.user.id;

        await Deck.deleteDeckCompletely(deckId, userId);

        res.json({success: true});
    } catch (error) {
        console.error('Error deleting deck from bookshelf:', error);
        res.status(500).json({error: 'Failed to delete deck from bookshelf'});
    }
}

/**
 * @api {post} /:deckId/ratings Add rating to deck
 * @apiName addRatingsToDeck
 * @apiGroup Deck
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function addRatingToDeck(req, res) {
    try {
        const {deckId} = req.params;
        const userId = req.user.id;

        const {rating} = req.body;

        const ratedDeck = await Deck.addRatingToDeck(deckId, userId, rating);

        res.json({ratedDeck});
    } catch (error) {
        console.error('Error adding rating to deck:', error);
        res.status(500).json({error: 'Failed to add rating to deck'});
    }
}

/**
 * @api {get} /:deckId/ratings Get deck rating
 * @apiName getDeckRating
 * @apiGroup Deck
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getDeckRating(req, res) {
    try {
        const {deckId} = req.params;
        const userId = req.user.id;

        const rating = await Deck.getDeckRating(deckId, userId);

        res.json({rating});
    } catch (error) {
        console.error('Error adding rating to deck:', error);
        res.status(500).json({error: 'Failed to add rating to deck'});
    }
}

/**
 * @api {get} /search Search public decks
 * @apiName searchPublicDecks
 * @apiGroup Deck
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} A Promise that resolves once the response is sent.
 */
async function searchPublicDecks(req, res) {
    try {
        const {deckName, tags, startingPage, sortMethod} = req.query;

        const decks = await Deck.searchPublicDecks(deckName, tags, startingPage, sortMethod);

        res.json(decks);
    } catch (error) {
        console.error('Error while searching for decks:', error);
        res.status(500).json({error: 'Failed to search for decks'});
    }
}

module.exports = {
    createDeck,
    getUserDecks,
    deleteDeckFromBookshelf,
    deleteDeckFromMarketplace,
    deleteDeckCompletely,
    deleteFlashcardFromDeck,
    updateFlashcardInDeck: editFlashcardInDeck,
    editDeck,
    importDeck,
    publishDeck,
    getDeckById,
    appendFlashCardToDeck,
    getFlashCards,
    getAFlashCardFromADeck,
    getDeckStats,
    addRatingToDeck,
    getDeckRating,
    searchPublicDecks,
    getAllUserDecks
};

