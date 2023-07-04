import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDeckIds} from "../../service/api";


export const getBooks = createAsyncThunk(
    "bookshelf/getBooks",
    async (payload, thunkAPI) => {
        return await getDeckIds();
    }
)