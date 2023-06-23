import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import cardCreationReducer from './card_creation/reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        creationForm: cardCreationReducer
    },
    devTools: true
});
