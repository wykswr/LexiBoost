import {createSlice} from "@reduxjs/toolkit";

const INITIAL_FORM_STATE = {
    spelling: '',
    type: '',
    pronunciation: '',
    hint: '',
    definition: ''
};

const creationFormSlice = createSlice({
    name: 'creationForm',
    initialState: INITIAL_FORM_STATE,
    reducers: {
        modifyInputField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        }
    }
})

export const {modifyInputField} = creationFormSlice.actions;

export default creationFormSlice.reducer;