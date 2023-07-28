import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedTags: []
}

const tagSelectSlice = createSlice({
    name: "tagSelect",
    initialState,
    reducers: {
        addTag: (state, action) => {
            state.selectedTags.push(action.payload);
        },
        removeTag: (state, action) => {
            state.selectedTags = state.selectedTags.filter(tag => tag !== action.payload);
        },
        resetTags: (state) => {
            state.selectedTags = [];
        },
        setTags: (state, action) => {
            state.selectedTags = action.payload;
        }
    }
});

export const {addTag, removeTag, resetTags, setTags} = tagSelectSlice.actions;
export default tagSelectSlice.reducer;