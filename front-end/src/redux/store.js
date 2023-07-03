import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import cardCreationReducer from './card_creation/reducer';
import marketPlaceReducer from './marketPlace/reducer';
import deckDetailReducer from './deckDetail/reducer'
import bookshelfReducer from './bookshelf/reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        deckDetail: deckDetailReducer,
        creationForm: cardCreationReducer,
        marketPlace: marketPlaceReducer,
        bookshelf: bookshelfReducer
    },
    devTools: true
});
