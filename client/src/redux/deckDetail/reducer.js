import {createSlice} from "@reduxjs/toolkit";

const INITIAL_DECK_DETAIL = {
    name: 'Cool Finish study Deck Part 2 of 5',
    cover: 'https://mediconnection.fi/wp-content/uploads/2020/05/Day-of-Finnish-Identity-1200x800.jpg',
    tags: [
        {
            id: '1',
            name: 'Elementary'
        },
        {
            id: '2',
            name: 'Finnish'
        }
    ],
    rating: 4.13,
    description: 'Handy vocabulary for entry-level Finnish learner',
    size: 240,
    creator_name: 'Sam',
    import_count: 13,
    creation_date: '2023-06-12',
    last_modification_date: '2023-06-22'
}

const deckDetailSlice = createSlice({
    name: 'deckDetail',
    initialState: INITIAL_DECK_DETAIL,
    reducers: {

    }
})

export default deckDetailSlice.reducer;