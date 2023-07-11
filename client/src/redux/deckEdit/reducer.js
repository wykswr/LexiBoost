import {createSlice} from "@reduxjs/toolkit";
import {createDeckAsync, editDeckAsync} from "./thunk.js";

const INITIAL_STATE = {
    pending: false,
    error: null
}

const deckEditSlice = createSlice({
    name: "deckEdit",
    initialState: INITIAL_STATE,
    reducers: {
        resetDeckEdit: (state, action) => {
            return INITIAL_STATE;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createDeckAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(createDeckAsync.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                window.location.reload();
            })
            .addCase(createDeckAsync.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            })
            .addCase(editDeckAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(editDeckAsync.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                window.location.reload();
            })
            .addCase(editDeckAsync.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
            })
    }
})

export default deckEditSlice.reducer;