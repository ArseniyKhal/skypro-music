import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logInState } from '../store/actions/creators/authCreator'

const DATA_TAG = 'Tracks'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://skypro-music-api.skyeng.tech',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access
    // console.debug('Использую токен из стора', { token })
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status !== 401) {
    return result
  }

  // Функция которая отчищает данные о юзере в сторе и отправляет на страницу логина
  const forceLogout = () => {
    console.log('на выход!')
    api.dispatch(logInState(null))
    window.location.href = '/login'
  }

  const { auth } = api.getState()
  // Если в сторе нет refresh токена, разлогиниваем его и отправляем авторизоваться руками
  if (!auth.refresh) {
    return forceLogout()
  }

  // Делаем запрос за новым access токеном в API обновления токена
  //   console.log('Делаем запрос за новым access токеном')
  const refreshResult = await baseQuery(
    {
      url: '/user/token/refresh/',
      method: 'POST',
      body: {
        refresh: auth.refresh,
      },
    },
    api,
    extraOptions,
  )

  // Если api обновления токена не вернуло новый access токен, то разлогиниваем юзера
  if (!refreshResult.data.access) {
    return forceLogout()
  }
  // получили новый access токен, сохраняем его в стор
  api.dispatch(logInState({ ...auth, access: refreshResult.data.access }))
  // Делаем повторный запрос с теми же параметрами что и исходный
  const retryResult = await baseQuery(args, api, extraOptions)

  // Если повторный запрос выполнился с 401 кодом, то что-то совсем пошло не так,
  // отправляем на принудительную ручную авторизацию
  if (retryResult?.error?.status === 401) {
    return forceLogout()
  }
  return retryResult
}

export const tracksApi = createApi({
  reducerPath: 'tracksApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Получить все треки
    getTracks: builder.query({
      query: () => '/catalog/track/all/',
      providesTags: () => [DATA_TAG],
    }),

    // Посмотреть подборку по id
    getСollections: builder.query({
      query(id) {
        return {
          url: `/catalog/selection/${id}/`,
          method: 'GET',
        }
      },
      providesTags: () => [DATA_TAG],
    }),

    // Получить все избранные треки
    getFavoriteTracks: builder.query({
      query: () => '/catalog/track/favorite/all/',
      providesTags: () => [DATA_TAG],
    }),

    // Добавить трек в избранное по id (лайкнуть трек)
    likeTrack: builder.mutation({
      query(id) {
        return {
          url: `/catalog/track/${id}/favorite/`,
          method: 'POST',
        }
      },
      invalidatesTags: [DATA_TAG],
    }),

    // Удалить трек из избранного по id (дизлайкнуть трек)
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
  useGetСollectionsQuery,
  useGetFavoriteTracksQuery,
  useLikeTrackMutation,
  useDislikeTrackMutation,
} = tracksApi
