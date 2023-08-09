const deckController = require('../controllers/deckController');
const express = require('express');
const generate = require('../middleware/generate');

/**
 * @type {Router}
 */

const router = express.Router();

// Return all predefined tags
router.get('/tags', (req, res) => res.json(['Science', 'History', 'Engineer', 'Art', 'Music', 'Language', 'Nature', 'Tool', 'Other']));

// Search deck
router.get('/search', deckController.searchPublicDecks);

// Create a new deck
router.post('/', generate, deckController.createDeck);

// Get decks for a user
router.get('/', deckController.getUserDecks);

// Get all decks for a user
router.get('/all', deckController.getAllUserDecks);

// Get flashcards for a specific user deck
router.get('/:deckId/flashcards', deckController.getFlashCards);

// Delete a deck completely
router.delete('/:deckId', deckController.deleteDeckCompletely);

// Get a deck statistics
router.get('/:deckId/statistics', deckController.getDeckStats);

// SoftDelete a deck from marketplace
router.delete('/:deckId/marketplace', deckController.deleteDeckFromMarketplace);

// SoftDelete flashcard from Deck
router.delete('/:deckId/flashcards/:flashCardId',
    deckController.deleteFlashcardFromDeck);

// DeckEdit flashcard in Deck
router.put('/:deckId/flashcards/:flashCardId',
    deckController.updateFlashcardInDeck);

// Get flashcard from Deck
router.get('/:deckId/flashcards/:flashCardId',
    deckController.getAFlashCardFromADeck);

// SoftDelete a deck bookshelf
router.delete('/:deckId/bookshelf', deckController.deleteDeckFromBookshelf);

// Appends a flash card to a deck.
router.post('/:deckId/flashcards', deckController.appendFlashCardToDeck);

// Get a deck by id
router.get('/:deckId', deckController.getDeckById);

// DeckEdit an existing deck
router.put('/:deckId', deckController.editDeck);

// Clone an existing deck
router.post('/:deckId/import', deckController.importDeck);

// Publish a deck in the marketplace
router.put('/:deckId/publish', deckController.publishDeck);

// Get ratings of deck
router.get('/:deckId/ratings', deckController.getDeckRating);

// Add ratings to deck
router.post('/:deckId/ratings', deckController.addRatingToDeck);

module.exports = router;
