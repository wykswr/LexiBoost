import {createSlice} from "@reduxjs/toolkit";
import {addCardToDeck} from "./thunk";

const initialState = {
    status: 'idle',
    card: {},
    error: null
};

const creationFormSlice = createSlice({
    name: 'creationForm',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addCardToDeck.fulfilled, (state, action) => {
                state.card = action.payload;
                state.status = 'succeeded'

            })
            .addCase(addCardToDeck.pending, (state, action) => {
                    state.status = 'pending'
                }
            )
            .addCase(addCardToDeck.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default creationFormSlice.reducer;