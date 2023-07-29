import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selected: null,
    id: null,
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload.selected;
            state.id = action.payload.id;
        },
        resetSelected: (state) => {
            state.selected = null;
            state.id = null;
        }
    }
});

export const {setSelected, resetSelected} = dialogSlice.actions;
export default dialogSlice.reducer;