import { configureStore } from '@reduxjs/toolkit'
import tracksReducer from './reducers/tracksReducers'

export const store = configureStore({
  reducer: {
    audioplayer: tracksReducer,
  },
})
