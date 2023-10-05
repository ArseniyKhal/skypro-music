import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  TOGGLE_PAUSE,
  NEXT_TRACK,
  PREV_TRACK,
  REPEAT_PLAYLIST,
  SHUFFLE_PLAYLIST,
  IS_LOADING,
  SET_TOKEN,
} from '../types/tracks'

export const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST,
  payload: { playlist },
})

export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  payload: { track },
})

export const togglePause = () => ({
  type: TOGGLE_PAUSE,
})

export const nextTrack = () => ({
  type: NEXT_TRACK,
})

export const prevTrack = () => ({
  type: PREV_TRACK,
})

export const toggleRepeat = () => ({
  type: REPEAT_PLAYLIST,
})

export const toggleShuffle = () => ({
  type: SHUFFLE_PLAYLIST,
})

export const isLoadingData = (isLoading) => ({
  type: IS_LOADING,
  payload: { isLoading },
})

export const setToken = (tokens) => ({
  type: SET_TOKEN,
  payload: { tokens },
})
