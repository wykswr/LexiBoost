const Deck = require('../models/deckModel');

/**
 * Retrieves a deck by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the response is sent.
 */
async function getDeckById(req, res) {
  try {
    const deckId = req.params.deckId;

    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({error: 'Deck not found'});
    }

    res.json({deck});
  } catch (error) {
    console.error('Error retrieving deck:', error);
    res.status(500).json({error: 'Failed to retrieve deck'});
  }
}

/**
 * TODO: Create an authentication middleware
 * that adds user information to the request
 * so req.user can contain the user id
 */

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
    // const creatorId = req.user.id;

    const deckData = {
      name,
      cover,
      description,
      rating: 0,
      size: flashCards.length,
      creatorId: 0, // Todo: this should be creatorId
      isPublic,
      importCount: 0,
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
 * @api {put} /decks/:deckId Edit an existing deck
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
    // const creatorId = req.user.id;
    /**
     * Todo: check if the user owns this deck
     */
    const deck = await Deck.editDeck(deckId, updatedFields);

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
    // const creatorId = req.user.id;
    /**
     * Check that a user does not own this deck
     */
    const creatorId = 123456;

    const importedDeck = await Deck.importDeck(deckId, creatorId);

    res.status(201).json({deck: importedDeck});
  } catch (error) {
    console.error('Error cloning deck:', error);
    res.status(500).json({error: 'Failed to clone deck'});
  }
}

/**
 * @api {post} /decks/:deckId/publish Publish a deck in the marketplace
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
 * Appends a flash card to a deck.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the response is sent.
 */
async function appendFlashCardToDeck(req, res) {
  try {
    const deckId = req.params.deckId;
    const {flashCard} = req.body;
    const userId = req.user.id;

    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({error: 'Deck not found'});
    }
    // Check if the authenticated user is the creator of the deck
    if (deck.creatorId !== userId) {
      return res.status(403).json({error: 'Forbidden'});
    }
    deck.flashCards.push(flashCard);

    await deck.save();

    res.json({deck});
  } catch (error) {
    console.error('Error appending flash card to deck:', error);
    res.status(500).json({error: 'Failed to append flash card to deck'});
  }
}

module.exports = {
  createDeck,
  editDeck,
  importDeck,
  publishDeck,
  getDeckById,
  appendFlashCardToDeck,
};
