import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['bookshelf'],
    endpoints: builder => ({
        getDecks: builder.query({
            query: () => '/decks',
            providesTags: ['bookshelf'],
        }),
        getDeck: builder.query({
            query: id => `/decks/${id}`,
        }),
        getDeckStats: builder.query({
            query: id => `/decks/${id}/statistics`,
        }),
        softDeleteDeck: builder.mutation({
            query: id => ({
                url: `/decks/${id}/bookshelf`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookshelf'],
        }),
        getFlashCards: builder.query({
           query: id => `/decks/${id}/flashcards`,
        }),
        // updateCard: builder.mutation({
        //     query: ({deck_id, card_id, content}) => ({
        //         url: `/decks/${deck_id}/`
        //     })
        //
        // })

    }),

});

export const {
    useGetDecksQuery,
    useGetDeckQuery,
    useGetDeckStatsQuery,
    useSoftDeleteDeckMutation,
    useGetFlashCardsQuery,
} = apiSlice;