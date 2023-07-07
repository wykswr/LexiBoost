const deckController = require('../controllers/deckController');
const express = require('express');

/**
 * @type {Router}
 */

const router = express.Router();

// Create a new deck
router.post('/', deckController.createDeck);

// Get decks for a user
router.get('/', deckController.getUserDecks);

// Delete a deck completely
router.delete('/:deckId', deckController.deleteDeckCompletely);

// Delete a deck from marketplace
router.delete('/:deckId/marketplace', deckController.deleteDeckFromMarketplace);

// Delete flashcard from Deck
router.delete('/:deckId/flashcards/:flashCardId',
    deckController.deleteFlashcardFromDeck);

// Edit flashcard in Deck
router.put('/:deckId/flashcards/:flashCardId',
    deckController.updateFlashcardInDeck);

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
