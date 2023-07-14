import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    tagTypes: ['UserProfile'],
    endpoints: builder => ({
        getDecks: builder.query({
            query: () => '/decks',
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
        })
    }),

});

export const {
    useGetDecksQuery,
    useGetDeckQuery,
    useGetUserProfileQuery,
    userUpdateUserProfileQuery
} = apiSlice;