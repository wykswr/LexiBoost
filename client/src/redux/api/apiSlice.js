import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URL, credentials: 'include'}),
    tagTypes: ['bookshelf', 'singleDeck', 'UserProfile', 'singleCard'],
    endpoints: builder => ({
        getDecks: builder.query({
            query: () => '/decks',
            providesTags: ['bookshelf'],
        }),
        getDeck: builder.query({
            query: id => `/decks/${id}`,
            providesTags: ['singleDeck'],
        }),
        getUserProfile: builder.query({
            query: () => `/users`,
            providesTags: ['UserProfile']
        }),
        updateUserProfile: builder.mutation({
            query: (newProfile) => ({
                url: `/users`,
                method: 'PUT',
                body: newProfile
            }),
            invalidatesTags: ['UserProfile']
        }),
        getDeckStats: builder.query({
            query: id => `/decks/${id}/statistics`,
            providesTags: ['singleCard', 'allCards']
        }),
        softDeleteDeck: builder.mutation({
            query: id => ({
                url: `/decks/${id}/bookshelf`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookshelf'],
        }),
        hardDeleteDeck: builder.mutation({
            query: id => ({
                url: `/decks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookshelf'],
        }),
        editDeck: builder.mutation({
            query: ({id, content}) => ({
                url: `/decks/${id}`,
                method: 'PUT',
                body: content,
            }),
            invalidatesTags: ['bookshelf', 'singleDeck'],
        }),
        addDeck: builder.mutation({
            query: content => ({
                url: '/decks',
                method: 'POST',
                body: content,
            }),
            invalidatesTags: ['bookshelf'],
        }),
        importDeck: builder.mutation({
            query: deckId => ({
                url: `/decks/${deckId}/import`,
                method: 'POST'
            }),
            invalidatesTags: ['bookshelf'],
        }),
        getFlashCards: builder.query({
           query: id => `/decks/${id}/flashcards`,
        }),
        getSingleFlashCard: builder.query({
            query: ({deckId, cardId}) => `/decks/${deckId}/flashcards/${cardId}`,
            providesTags: ['singleCard']
        }),
        addDeckAI: builder.mutation({
            query: content => ({
                url: '/decks/?ai=1',
                method: 'POST',
                body: content,
            }),
            invalidatesTags: ['bookshelf'],
        }),
        publishDeck: builder.mutation({
            query: id => ({
                url: `/decks/${id}/publish`,
                method: 'PUT',
            }),
            invalidatesTags: ['singleDeck'],
        }),
        retractDeck: builder.mutation({
            query: id => ({
                url: `/decks/${id}/marketplace`,
                method: 'DELETE',
            }),
            invalidatesTags: ['singleDeck'],
        }),
        searchDecks: builder.query({
            query: ({name, tags, page, sort}) => ({
                url: `/decks/search?deckName=${name}&tags=${tags}&startingPage=${page}&sortMethod=${sort}`,
                method: 'GET',
            }),
        }),
        getTags: builder.query({
            query: () => ({
                url: '/decks/tags',
                method: 'GET',
            }),
        }),
        signup: builder.mutation({
            query: content => ({
                url: '/users/signup',
                method: 'POST',
                body: content,
            }),
        }),
        login: builder.mutation({
            query: content => ({
                url: '/users/login',
                method: 'POST',
                body: content,
            }),
            invalidatesTags: ['bookshelf', 'singleDeck', 'UserProfile'],
        }),
        deleteFlashCard: builder.mutation({
            query: ({deckId, cardId}) => ({
                url: `/decks/${deckId}/flashcards/${cardId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['singleCard']
        }),
        updateFlashCard: builder.mutation({
            query: ({deckId, cardId, content}) => ({
                url: `/decks/${deckId}/flashcards/${cardId}`,
                method: 'PUT',
                body: content
            }),
            invalidatesTags: ['singleCard', 'allCards']
        }),
        addFlashCard: builder.mutation({
            query: ({deckId, content}) => ({
                url: `/decks/${deckId}/flashcards`,
                method: 'POST',
                body: content
            })
        })

    }),
});

export const {
    useGetDecksQuery,
    useGetDeckQuery,
    useGetDeckStatsQuery,
    useSoftDeleteDeckMutation,
    useEditDeckMutation,
    useAddDeckMutation,
    useAddDeckAIMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useImportDeckMutation,
    useGetFlashCardsQuery,
    usePublishDeckMutation,
    useRetractDeckMutation,
    useHardDeleteDeckMutation,
    useSearchDecksQuery,
    useGetTagsQuery,
    useGetSingleFlashCardQuery,
    useSignupMutation,
    useLoginMutation,
    useDeleteFlashCardMutation,
    useUpdateFlashCardMutation,
    useAddFlashCardMutation
} = apiSlice;