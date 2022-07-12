import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000',
        // prepareHeaders: (headers, {
        //     getState
        // }) => {
        //     // prioritize token in state, otherwise set token to last stored token
        //     const stateToken = getState().auth.token
        //     const localToken = localStorage.getItem("token")
        //     const token = (stateToken ? stateToken : localToken)
        //     if (token) {
        //         headers.set('Authorization', `Token ${token}`)
        //     }
        //     headers.set('Content-Type', 'application/json')
        //     return headers
        // }
    }),
    endpoints: (builder) => ({
        getWorkouts: builder.query({
            query: () => ({
                url: 'api/workouts/',
                method: 'GET',
            }),
            providesTags: ['Workout']
        }),
        login: builder.mutation({
            query: credentials => ({
                url: `accounts/auth/login/`,
                method: "POST",
                body: {
                    username: credentials.username,
                    password: credentials.password
                }
            }),
            providesTags: ['User']
        }),
        register: builder.mutation({
            query: credentials => ({
                url: `accounts/auth/register/`,
                method: "POST",
                body: {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                }
            }),
            providesTags: ['User', 'Lead']
        }),
        getUser: builder.query({
            query: () => ({
                url: `accounts/auth/user/`,
                method: "GET"
            }),
            providesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: `accounts/auth/logout/`,
                method: "POST"
            }),
            invalidatesTags: ['User', 'Lead']
        }),
    })
})

export const {
    useGetWorkoutsQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetUserQuery,
} = apiSlice