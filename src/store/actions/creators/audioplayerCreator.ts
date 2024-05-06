import {TrackType} from '../../../types'
import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  TOGGLE_PAUSE,
  NEXT_TRACK,
  PREV_TRACK,
  SHUFFLE_PLAYLIST,
} from '../types/constants'

export const addPlaylist = (playlist:TrackType[]) => ({
  type: ADD_PLAYLIST,
  payload: { playlist },
})

export const setCurrentTrack = (track:TrackType) => ({
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

export const toggleShuffle = (status?: boolean ) => ({
  type: SHUFFLE_PLAYLIST,
  payload: { status },
})
