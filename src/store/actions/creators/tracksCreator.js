import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  TOGGLE_PAUSE,
  NEXT_TRACK,
  PREV_TRACK,
  REPEAT_PLAYLIST,
} from '../types/tracks'

export const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST,
  payload: { playlist },
})

export const setCurrentTrack = ({ id }) => ({
  type: SET_CURRENT_TRACK,
  payload: { id },
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
