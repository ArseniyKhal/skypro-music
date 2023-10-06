import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech',
  }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: () => '/catalog/track/all/',
    }),
  }),
})

export const { useGetTracksQuery } = tracksApi
