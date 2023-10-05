import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/catalog/track/',
  }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: () => 'all/',
    }),
  }),
})

export const { useGetTracksQuery } = tracksApi
