import { configureStore } from '@reduxjs/toolkit'
import audioplayerReducer from './reducers/audioplayerReducers'
import authReducer from './reducers/authReducer'
import { tracksApi } from '../services/servicesApi'

export const store = configureStore({
  reducer: {
    audioplayer: audioplayerReducer,
    auth: authReducer,
    [tracksApi.reducerPath]: tracksApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tracksApi.middleware),
})
