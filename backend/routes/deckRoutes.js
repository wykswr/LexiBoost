const deckController = require('../controllers/deckController');
const express = require('express');

/**
 * Todo: add an authenticate middleware here
 * @type {Router}
 */

const router = express.Router();

// Create a new deck
router.post('/', deckController.createDeck);
// Appends a flash card to a deck.
router.post('/:deckId/flashcards', deckController.appendFlashCardToDeck);
// Get a deck by id
router.get('/:deckId', deckController.getDeckById);

// Edit an existing deck
router.put('/:deckId', deckController.editDeck);

// Clone an existing deck
router.post('/:deckId/import', deckController.importDeck);

// Publish a deck in the marketplace
router.put('/:deckId/publish', deckController.publishDeck);

module.exports = router;
