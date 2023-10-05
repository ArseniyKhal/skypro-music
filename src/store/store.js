import { configureStore } from '@reduxjs/toolkit'
import tracksReducer from './reducers/tracksReducers'
import { tracksApi } from '../services/servicesApi'

export const store = configureStore({
  reducer: {
    audioplayer: tracksReducer,
    [tracksApi.reducerPath]: tracksApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tracksApi.middleware),
})
