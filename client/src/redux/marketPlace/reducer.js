import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    query: "",
    tags: [],
    sort: "",
    pending: false,
    results: [1, 2, 3, 4, 5],
    error: null
}

const marketPlaceSlice = createSlice({
    name: "marketPlace",
    initialState: INITIAL_STATE,
    reducers: {
        defQuery: (state, action) => {
            state.query = action.payload;
        },
        defTags: (state, action) => {
            state.tags = action.payload;
        },
        defSort: (state, action) => {
            state.sort = action.payload;
        },
        search: (state) => {
            state.pending = true;
        }
    }
})

export const {defQuery, defTags, defSort, search} = marketPlaceSlice.actions;
export default marketPlaceSlice.reducer;