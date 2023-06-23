import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import deckDetailReducer from './deckDetail/reducer'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        deckDetail: deckDetailReducer
    },
    devTools: true
});
