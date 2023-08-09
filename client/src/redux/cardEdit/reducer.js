import {createSlice} from "@reduxjs/toolkit";
import {fetchDeck} from "./thunk";
import {addCardToDeck} from "../card_creation/thunk";

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
        builder.addCase(addCardToDeck.fulfilled, (state, action) => {
            state.cards = action.payload.flashCards;
        })

    }
})

export default cardEditSlice.reducer;