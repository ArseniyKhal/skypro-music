import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  PAUSE,
  NEXT_TRACK,
} from '../actions/types/tracks'

const initialState = {
  plauing: false,
  playlist: [],
  track: null,
}

export default function tracksReducer(state = initialState, action) {
  switch (action.type) {
    // загрузка плей-листа
    case ADD_PLAYLIST: {
      const { playlist } = action.payload
      return {
        ...state,
        playlist,
      }
    }

    // загрузка трека в плеер
    case SET_CURRENT_TRACK: {
      const { id } = action.payload

      return {
        ...state,
        track: state.playlist.filter((item) => item.id === id)[0],
        plauing: true,
      }
    }

    // пауза
    case PAUSE: {
      return {
        ...state,
        plauing: !state.plauing,
      }
    }

    // следующий трек
    case NEXT_TRACK: {
      const { id } = state.track
      const indexCurrentTrack = state.playlist.findIndex(
        (track) => track.id === id,
      )
      let indexNextTrack = indexCurrentTrack
      if (indexNextTrack < state.playlist.length - 1) {
        indexNextTrack = indexCurrentTrack + 1
      }
      return {
        ...state,
        track: state.playlist[indexNextTrack],
      }
    }

    default:
      return state
  }
}
