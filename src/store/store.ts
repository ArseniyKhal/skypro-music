import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import audioplayerReducer from './reducers/audioplayerReducers'
import authReducer from './reducers/authReducer'
import { tracksApi } from '../services/servicesApi'

export const rootReducer = combineReducers({
	audioplayer: audioplayerReducer,
	auth: authReducer,
	[tracksApi.reducerPath]: tracksApi.reducer
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tracksApi.middleware),
})

