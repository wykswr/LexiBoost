import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['bookshelf', 'singleDeck'],
    endpoints: builder => ({
        getDecks: builder.query({
            query: () => '/decks',
            providesTags: ['bookshelf'],
        }),
        getDeck: builder.query({
            query: id => `/decks/${id}`,
            providesTags: ['singleDeck'],
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
    }),

});

export const {
    useGetDecksQuery,
    useGetDeckQuery,
    useGetDeckStatsQuery,
    useSoftDeleteDeckMutation,
    useEditDeckMutation,
    useAddDeckMutation,
} = apiSlice;