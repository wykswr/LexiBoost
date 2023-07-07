import { createAsyncThunk} from "@reduxjs/toolkit";

export const addCardToDeck = createAsyncThunk(
    'POST_CARD',
    async(query) => {
        const res = await fetch(`localhost:8000/decks/deckId=${query.deckID}/flashcards`, {
            method: 'POST',
            body: JSON.stringify({
                flashCard: query.card
            })
        })
    }
);