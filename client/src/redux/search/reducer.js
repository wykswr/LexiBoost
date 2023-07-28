import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name: '',
    tags: [],
    sort: '',
    page: 0,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        nextPage: (state) => {
            state.page += 1;
        },
        prevPage: (state) => {
            if (state.page > 0) {
                state.page -= 1;
            }
        }
    }
});

export default searchSlice.reducer;
export const {setName, setTags, setSort, nextPage, prevPage} = searchSlice.actions;