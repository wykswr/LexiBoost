import {createSlice} from "@reduxjs/toolkit";
import {fetchDeck} from "./thunk.js";

const initialState = {
    cards : [],
    pending : false,
    error : null
}

const cardEditSlice = createSlice({
    name : "cardEdit",
    initialState,
    reducers : {
    },
    extraReducers : builder => {
        builder.addCase(fetchDeck.fulfilled, (state, action) => {
            console.log(action);
            state.cards = action.payload.flashCards;
            state.pending = false;
            state.error = null;
        })
        builder.addCase(fetchDeck.pending, (state, action) => {
            state.pending = true;
        })
        builder.addCase(fetchDeck.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error;
        })
    }
})

export default cardEditSlice.reducer;