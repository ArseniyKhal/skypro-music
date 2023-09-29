import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  TOGGLE_PAUSE,
  NEXT_TRACK,
  PREV_TRACK,
  REPEAT_PLAYLIST,
} from '../actions/types/tracks'

const initialState = {
  plauing: false,
  playlist: [],
  track: null,
  loop: false,
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
    case TOGGLE_PAUSE: {
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

    // предыдущий трек
    case PREV_TRACK: {
      const { id } = state.track
      const indexCurrentTrack = state.playlist.findIndex(
        (track) => track.id === id,
      )
      let indexPrevTrack = indexCurrentTrack
      if (indexPrevTrack < state.playlist.length - 1 && indexPrevTrack > 0) {
        indexPrevTrack = indexCurrentTrack - 1
      }
      return {
        ...state,
        track: state.playlist[indexPrevTrack],
      }
    }

    // воспроизведение треков по кругу
    case REPEAT_PLAYLIST: {
      return {
        ...state,
        loop: !state.loop,
      }
    }

    default:
      return state
  }
}
