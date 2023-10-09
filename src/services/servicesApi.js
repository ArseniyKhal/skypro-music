import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const DATA_TAG = { type: 'Tracks', id: 'LIST' }

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken
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
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Tracks', id })), DATA_TAG]
          : [DATA_TAG],
    }),

    addFavoriteTrack: builder.mutation({
      query(id) {
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: 'POST',
        }
      },
      invalidatesTags: [DATA_TAG],
    }),
    delFavoriteTrack: builder.mutation({
      query(id) {
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: 'DELETE',
        }
      },
      invalidatesTags: [DATA_TAG],
    }),
  }),
})

export const {
  useGetTracksQuery,
  useGetFavoriteTracksQuery,
  useAddFavoriteTrackMutation,
  useDelFavoriteTrackMutation,
} = tracksApi
