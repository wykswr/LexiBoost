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
        setPage: (state, action) => {
            state.page = action.payload;
        }
    }
});

export default searchSlice.reducer;
export const {setName, setTags, setSort, setPage } = searchSlice.actions;