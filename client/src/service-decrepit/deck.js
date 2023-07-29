import {api} from "./api.js";


export const createDeck = async (name, cover, tags, description) => {
    const deck = {
        name: name,
        cover: cover,
        tags: tags,
        description: description,
        flashCards: []
    }
    const response = await api.post("/decks", deck);
    return response.data;
}

export const getDecks = async () => {
    const response = await api.get("/decks");
    return response.data.decks.map(deck => deck._id);
}

export const getDeck = async (id) => {
    // id as path parameter
    const response = await api.get(`/decks/${id}`);
    return response.data.deck;
}

export const editDeck = async (name, cover, tags, description, id) => {
    const deck = {
        name: name,
        cover: cover,
        tags: tags,
        description: description,
    }

    // append non-empty fields to deck object
    if (name === "") {
        delete deck.name;
    }
    if (cover === "") {
        delete deck.cover;
    }
    if (tags === "") {
        delete deck.tags;
    }
    if (description === "") {
        delete deck.description;
    }
    const response = await api.put(`/decks/${id}`, deck);
    return response.data;
}

export const deleteDeck = async (id) => {
    const response = await api.delete(`/decks/${id}/bookshelf`);
    return response.data;
}