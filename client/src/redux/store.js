import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/reducer.js';
import profileEditingReducer from './userProfile/reducer.js';
import dialogReducer from './dialog/reducer.js';
import tagSelectReducer from './tagSelect/reducer.js';
import searchReducer from './search/reducer.js';
import {apiSlice} from "./api/apiSlice.js";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        dialog: dialogReducer,
        auth: authReducer,
        profileEditingForm: profileEditingReducer,
        tagSelect: tagSelectReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
