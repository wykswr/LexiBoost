import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/reducer.js';
import cardCreationReducer from './card_creation/reducer.js';
import marketPlaceReducer from './marketPlace/reducer.js';
import profileEditingReducer from './userProfile/reducer.js';
import deckDetailReducer from './deckDetail/reducer.js'
import deckEditReducer from './deckEdit/reducer.js';
import cardEditReducer from './cardEdit/reducer.js';
import dialogReducer from './dialog/reducer.js';
import {apiSlice} from "./api/apiSlice.js";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        dialog: dialogReducer,
        auth: authReducer,
        deckDetail: deckDetailReducer,
        creationForm: cardCreationReducer,
        profileEditingForm: profileEditingReducer,
        marketPlace: marketPlaceReducer,
        deckEdit: deckEditReducer,
        cardEdit: cardEditReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
