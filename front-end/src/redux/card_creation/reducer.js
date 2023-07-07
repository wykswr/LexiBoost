import {createSlice} from "@reduxjs/toolkit";
import {addCardToDeck} from "./thunk";

const INITIAL_FORM_STATE = {
    spelling: '',
    pronunciation: '',
    definition: [""],
    examples: [""],
    burnt: false,
    mistakeCount: 0,
    correctCount: 0
};

const creationFormSlice = createSlice({
    name: 'creationForm',
    initialState: INITIAL_FORM_STATE,
    reducers: {
        modifyInputField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addCardToDeck.fulfilled, (state, action) => {
            state = INITIAL_FORM_STATE;
        })
    }
})

export const {modifyInputField} = creationFormSlice.actions;

export default creationFormSlice.reducer;