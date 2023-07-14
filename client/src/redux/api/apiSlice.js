import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['UserProfile', 'bookshelf'],
    endpoints: builder => ({
        getDecks: builder.query({
            query: () => '/decks',
            providesTags: ['bookshelf'],
        }),
        getDeck: builder.query({
            query: id => `/decks/${id}`,
        }),
        getUserProfile: builder.query({
            query: userId => `/${userId}`,
            providesTags: ['UserProfile']
        }),
        updateUserProfile: builder.mutation({
            query: ({userId, newProfile}) => ({
                url: `/${userId}`,
                method: 'PUT',
                body: newProfile
            }),
            invalidatesTags: ['UserProfile']
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
        importDeck: builder.mutation({
            query: deckId => ({
                url: `/decks/${deckId}/import`,
                method: 'POST'
            })
        })
    }),

});

export const {
    useGetDecksQuery,
    useGetDeckQuery,
    useGetDeckStatsQuery,
    useSoftDeleteDeckMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileQuery,
    useImportDeckMutation
} = apiSlice;