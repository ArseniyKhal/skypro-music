import {
  ADD_TRACKS,
  PLAY_TRACK,
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
} from '../types/tracks'

let nextTrackId = 0

export const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST,
  payload: { playlist },
})

export const setCurrentTrack = ({ id, name, author, logo, trackFile }) => ({
  type: SET_CURRENT_TRACK,
  payload: { id, name, author, logo, trackFile },
})

export const addTracks = (content) => ({
  type: ADD_TRACKS,
  payload: {
    id: ++nextTrackId,
    content,
  },
})

export const playTrack = (id) => ({
  type: PLAY_TRACK,
  payload: { id },
})
