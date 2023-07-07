import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDecks, deleteDeck} from "../../service/deck";


export const getBooks = createAsyncThunk(
    "bookshelf/getBooks",
    async (payload, thunkAPI) => {
        return await getDecks()
    }
)

export const deleteBook = createAsyncThunk(
    "bookshelf/deleteBook",
    async (id) => {
        const state = await deleteDeck(id);
        console.assert(state.success)
        return {id: id, state: state};
    }
)