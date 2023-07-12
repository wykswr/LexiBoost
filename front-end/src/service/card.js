import {api} from "./api";


export const deleteCard = async (cardID, deckID) => {
    const res = await api.delete(`decks/${deckID}/flashcards/${cardID}`);
    return res.data;
}

export const editCard = async (cardID, deckID, spelling, pronunciation, definition, examples) => {
    let card = {
        spelling,
        definition,
        examples,
        pronunciation,
    }
    if (!pronunciation) {
        delete card.pronunciation
    }
    const res = await api.put(`/decks/${deckID}/flashcards/${cardID}`, card);
    return res.data;
}

export const addCard = async (deckID, spelling, pronunciation, definition, examples) => {
    let card = {
        spelling,
        definition,
        examples,
        pronunciation
    }

    if (!pronunciation) {
        delete card.pronunciation;
    }

    const response = await api.post(`/decks/${deckID}/flashcards`, card);
    return response.data.deck;
}