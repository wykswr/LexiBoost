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
                "Japanese",
                "Travel"
            ],
            rating: 4,
        },
        {
            id: 2,
            name: "Test B",
            cover: "https://picsum.photos/200",
            tags: [
                "English"
            ],
            rating: 4.5,
        },
        {
            id: 3,
            name: "Test C",
            cover: "https://picsum.photos/300",
            tags: [
                "German"
            ],
            rating: 4
        },
        {
            id: 4,
            name: "Test D",
            cover: "https://picsum.photos/400",
            tags: [
                "Chinese"
            ],
            rating: 4.5
        },
        {
            id: 5,
            name: "Test E",
            cover: "https://picsum.photos/500",
            tags: [
                "Korean"
            ],
            rating: 4
        },
        {
            id: 6,
            name: "Test F",
            cover: "https://picsum.photos/600",
            tags: [
                "French"
            ],
            rating: 4.5
        },
    ]

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
        }
        ,
        {
            id: 3,
            total: 30,
            burned: 10,
        }
        ,
        {
            id: 4,
            total: 25,
            burned: 10,
        }
        ,
        {
            id: 5,
            total: 30,
            burned: 6,
        }
        ,
        {
            id: 6,
            total: 30,
            burned: 10,
        }]

    return records.find(record => record.id === id);
}
