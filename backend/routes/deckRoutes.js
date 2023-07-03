const deckController = require('../controllers/deckController');
const express = require('express');

/**
 * Todo: add an authenticate middleware here
 * @type {Router}
 */

const router = express.Router();

// Create a new deck
router.post('/', deckController.createDeck);

// Get decks for a user
router.get('/decks', deckController.getUserDecks);

// Delete a deck completely
router.delete('/:deckId', deckController.deleteDeckCompletely);

// Delete a deck from marketplace
router.delete('/:deckId/marketplace', deckController.deleteDeckFromMarketplace);

// Delete a deck bookshelf
router.delete('/:deckId/bookshelf', deckController.deleteDeckFromBookshelf);

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
