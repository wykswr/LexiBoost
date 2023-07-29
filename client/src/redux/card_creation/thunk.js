import { createAsyncThunk} from "@reduxjs/toolkit";
import {deleteCard, editCard, addCard} from "../../service-decrepit/card.js";


export const addCardToDeck = createAsyncThunk(
    'creationForm/addCardToDeck',
    async(query) => {
        return await addCard(query.deckID, query.card.spelling, query.card.pronunciation, query.card.definition, query.card.examples)
    }
);

export const deleteFlashCard = createAsyncThunk(
    'creationForm/deleteFlashCard',
    async(query) => {
        return await deleteCard(query.cardID, query.deckID);
    }
);

export const editFlashCard = createAsyncThunk(
    'creationForm/editFlashCard',
    async (query) => {
        return await editCard(query.cardID, query.deckID, query.card.spelling, query.card.pronunciation, query.card.definition, query.card.examples)
    }
)