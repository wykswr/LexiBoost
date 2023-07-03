import {createSlice} from "@reduxjs/toolkit";
import {getBooks} from "./thunk";


const INITIAL_STATE = {
    IDs: [],
    pending: false,
    error: null
}

const bookshelfSlice = createSlice({
    name: "bookshelf",
    initialState: INITIAL_STATE,
    reducers: {
        removeDeck: (state, action) => {
            state.IDs = state.IDs.filter(id => id !== action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.pending = true;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.pending = false;
                state.IDs = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            })
    }
})

export default bookshelfSlice.reducer;
export const {removeDeck} = bookshelfSlice.actions;