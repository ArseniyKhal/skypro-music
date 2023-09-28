import { ADD_TRACKS, PLAY_TRACK, ADD_PLAYLIST } from '../types/tracks'

let nextTrackId = 0

export const addPlaylist = (playlist) => ({
  type: ADD_PLAYLIST,
  payload: { playlist },
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
