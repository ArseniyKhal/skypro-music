import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().audioplayer.tokens.access
      console.debug('Использую токен из стора', { token })
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: () => '/catalog/track/all/',
    }),
    getFavoriteTracks: builder.query({
      query: () => '/catalog/track/favorite/all/',
    }),
  }),
})

export const { useGetTracksQuery, useGetFavoriteTracksQuery } = tracksApi
