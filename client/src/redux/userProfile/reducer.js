import {createSlice} from "@reduxjs/toolkit";

const INITIAL_PROFILE_STATE = {
    id: 'Unknown',
    username: 'Rorschach',
    avatar: 'https://i.natgeofe.com/n/fc920f78-86a9-48d2-8346-27e299f9cac7/explore-mental-health-paint-2.jpg?w=1084.125&h=811.125',
    email_address: 'abc@ymail.com',
    interested_topics: ['Italian', 'Conjugation', 'passato-prossimo', 'French', 'Mandarin'],
    decks_created: [
        {
            "id": "1220",
            "title": "UBC Italian 202 vocabulary",
        },
        {
            "id": "1221",
            "title": "Many French words",
        },
        {
            "id": "1222",
            "title": "Entry level ielts vocabulary",
        },


    ],
    isOpen: false
}


const profileEditingFormSlice = createSlice({
    name: 'profileEditingForm',
    initialState: INITIAL_PROFILE_STATE,
    reducers: {
        modifyProfileField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        flipVisibility: (state, action) => {
            state.isOpen = !state.isOpen;
        }
    }
})

export const {modifyProfileField, flipVisibility} = profileEditingFormSlice.actions;

export default profileEditingFormSlice.reducer;

