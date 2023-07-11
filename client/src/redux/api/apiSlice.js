import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: [],
    endpoints: builder => ({
        getDecks: builder.query({
            query: () => '/decks',
        }),
        getDeck: builder.query({
            query: id => `/decks/${id}`,
        }),
    }),

});

export const {
    useGetDecksQuery,
    useGetDeckQuery,
} = apiSlice;