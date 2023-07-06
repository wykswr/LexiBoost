import {api} from "./api";


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

<<<<<<<< HEAD:client/src/service-decrepit/fakeDeck.js
// export const getProgress = async (id) => {
//     const response = await api.get("/progress", {
//         params: {
//             id: id,
//         }
//     });
//     return response.data;
// }


export const getProgress = async (id) => {
    return {total: 10,
        burned: 5,
    }
    // const records = [
    //     {
    //         id: 1,
    //         total: 10,
    //         burned: 5,
    //     },
    //     {
    //         id: 2,
    //         total: 30,
    //         burned: 10,
    //     }
    //     ,
    //     {
    //         id: 3,
    //         total: 30,
    //         burned: 10,
    //     }
    //     ,
    //     {
    //         id: 4,
    //         total: 25,
    //         burned: 10,
    //     }
    //     ,
    //     {
    //         id: 5,
    //         total: 30,
    //         burned: 6,
    //     }
    //     ,
    //     {
    //         id: 6,
    //         total: 30,
    //         burned: 10,
    //     }]
    //
    // return records.find(record => record.id === id);
========
export const getDeck = async (id) => {
    // id as path parameter
    const response = await api.get(`/decks/${id}`);
    return response.data.deck;
>>>>>>>> 529e2bc (connect bookshelf):front-end/src/service/deck.js
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