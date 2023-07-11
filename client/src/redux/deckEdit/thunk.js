import {createAsyncThunk} from "@reduxjs/toolkit";
import {createDeck, editDeck, getDeck} from "../../service-decrepit/deck.js";


export const createDeckAsync = createAsyncThunk(
    "deckEdit/createDeck",
    async (deck) => {
        return await createDeck(deck.name, deck.cover, deck.tags, deck.description);
    }
)

export const editDeckAsync = createAsyncThunk(
    "deckEdit/editDeck",
    async (deck) => {
        return await editDeck(deck.name, deck.cover, deck.tags, deck.description, deck.id);
    }
)