import axios from "axios";


const api = axios.create({
        baseURL: "http://localhost:8000/api",
    }
);


// return a list of decks sorted by name matching the query
// export const searchDecks = async (query) => {
//     const response = await api.get("/search", {
//         params: {
//             query: query,
//             limit: 5,
//         }
//     });
//     return response.data;
// }

export const searchDecks = async (query) => {
    const decks = [
        {id: 1, name: "Apple", likes: 1},
        {id: 2, name: "Banana", likes: 2},
        {id: 3, name: "Orange", likes: 3},
        {id: 4, name: "Pineapple", likes: 4},
        {id: 5, name: "Strawberry", likes: 5},
        {id: 6, name: "Watermelon", likes: 6},
        {id: 7, name: "Grape", likes: 7},
        {id: 8, name: "Blueberry", likes: 8},
        {id: 9, name: "Mango", likes: 9},
        {id: 10, name: "Peach", likes: 10},
        {id: 11, name: "Pear", likes: 11},
        {id: 12, name: "Cherry", likes: 12},
        {id: 13, name: "Kiwi", likes: 13},
        {id: 14, name: "Lemon", likes: 14},]

    return decks.filter(deck => deck.name.toLowerCase().includes(query.toLowerCase()));
}


// export const getTags = async () => {
//     const response = await api.get("/tags");
//     return response.data;
// }

export const getTags = async () => {
    return ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"];
}

// export const getDeck = async (id, sortBy) => {
//     const response = await api.get("/deck", {
//         params: {
//             id: id,
//         }
//     });
//     return response.data;
// }

export const getDeck = async (id, sortBy) => {
    const decks = [
        {
            id: 1,
            name: "Test A",
            cover: "https://picsum.photos/100",
            tags: [
                "tag a",
                "tag b"
            ]
        },
        {
            id: 2,
            name: "Test B",
            cover: "https://picsum.photos/200",
            tags: [
                "English"
            ]
        }]

    return decks.find(deck => deck.id === id);
}

// export const getProgress = async (id) => {
//     const response = await api.get("/progress", {
//         params: {
//             id: id,
//         }
//     });
//     return response.data;
// }


export const getProgress = async (id) => {
    const records = [
        {
            id: 1,
            total: 10,
            burned: 5,
        },
        {
            id: 2,
            total: 30,
            burned: 10,
        }]

    return records.find(record => record.id === id);
}