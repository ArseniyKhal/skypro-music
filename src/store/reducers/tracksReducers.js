import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  TOGGLE_PAUSE,
  NEXT_TRACK,
  PREV_TRACK,
  REPEAT_PLAYLIST,
  SHUFFLE_PLAYLIST,
} from '../actions/types/tracks'

// import { isShuffledSelector } from '../selectors/tracksSelectors'

const initialState = {
  plauing: false,
  playlist: [],
  track: null,
  loop: false,
  shuffled: false,
  shuffledPlaylist: [],
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
      if (indexCurrentTrack < state.playlist.length - 1) {
        indexNextTrack += 1
      }
      if (state.loop) {
        if (indexCurrentTrack === state.playlist.length - 1) {
          indexNextTrack = 0
        }
      }
      let list = state.playlist[indexNextTrack]
      if (state.shuffled) {
        list = state.shuffledPlaylist[indexNextTrack]
      }
      return {
        ...state,
        track: list,
        plauing: true,
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
      let list = state.playlist[indexPrevTrack]
      if (state.shuffled) {
        list = state.shuffledPlaylist[indexPrevTrack]
      }
      return {
        ...state,
        track: list,
        plauing: true,
      }
    }

    // воспроизведение треков по кругу
    case REPEAT_PLAYLIST: {
      return {
        ...state,
        loop: !state.loop,
      }
    }

    // перемешать треки в плейлисте
    case SHUFFLE_PLAYLIST: {
      return {
        ...state,
        shuffled: !state.shuffled,
        shuffledPlaylist: [...state.playlist].sort(() => 0.5 - Math.random()),
      }
    }

    default:
      return state
  }
}
