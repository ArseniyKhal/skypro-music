import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  setAccessToken,
  logInState,
} from '../store/actions/creators/authCreator'
import { refreshToken } from '../api'

const DATA_TAG = 'Tracks'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://skypro-music-api.skyeng.tech',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    // console.debug('Использую токен из стора', { token })
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const refToken = api.getState().auth.refreshToken
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // пробуем получить новый токен
    //  console.log('пробуем получить новый токен')
    const refreshResult = await refreshToken(refToken)
    if (refreshResult.access) {
      // сохраняем новый токен
      // console.log('сохраняем новый токен')
      api.dispatch(setAccessToken(refreshResult.access))
      // повторяем первоначальный запрос
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logInState(false))
      // console.log('на выход!')
    }
  }
  return result
}

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // получить список треков
    getTracks: builder.query({
      query: () => '/catalog/track/all/',
      providesTags: () => [DATA_TAG],
    }),
    // получить список избранных треков
    getFavoriteTracks: builder.query({
      query: () => '/catalog/track/favorite/all/',
      providesTags: () => [DATA_TAG],
    }),
    // лайкнуть трек
    likeTrack: builder.mutation({
      query(id) {
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: 'POST',
        }
      },
      invalidatesTags: [DATA_TAG],
    }),
    // дизлайкнуть трек
    dislikeTrack: builder.mutation({
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
  useLikeTrackMutation,
  useDislikeTrackMutation,
} = tracksApi
