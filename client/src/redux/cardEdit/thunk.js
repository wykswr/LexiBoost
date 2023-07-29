import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDeck} from "../../service-decrepit/deck.js";

export const fetchDeck = createAsyncThunk(
    "cardEdit/fetchDeck",
    async (deckId) => {
        return await getDeck(deckId)
    }
)