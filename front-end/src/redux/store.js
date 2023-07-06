import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import cardCreationReducer from './card_creation/reducer';
import marketPlaceReducer from './marketPlace/reducer';
import profileEditingReducer from './userProfile/reducer';
import deckDetailReducer from './deckDetail/reducer'
import bookshelfReducer from './bookshelf/reducer';
import deckEditReducer from './deckEdit/reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        deckDetail: deckDetailReducer,
        creationForm: cardCreationReducer,
        profileEditingForm: profileEditingReducer,
        marketPlace: marketPlaceReducer,
        bookshelf: bookshelfReducer,
        deckEdit: deckEditReducer
    },
    devTools: true
});
