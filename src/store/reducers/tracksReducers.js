import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  TOGGLE_PAUSE,
  NEXT_TRACK,
  PREV_TRACK,
  REPEAT_PLAYLIST,
  SHUFFLE_PLAYLIST,
} from '../actions/types/tracks'

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
      const playlist = state.shuffled ? state.shuffledPlaylist : state.playlist
      const currentTrackIndex = playlist.findIndex((track) => track.id === id)
      const newTrack = playlist[currentTrackIndex + 1]
      if (!newTrack) {
        return state
      }
      return {
        ...state,
        track: newTrack,
        plauing: true,
      }
    }

    // предыдущий трек
    case PREV_TRACK: {
      const { id } = state.track
      const plaulist = state.shuffled ? state.shuffledPlaylist : state.playlist
      const currentTrackIndex = plaulist.findIndex((track) => track.id === id)
      const prevTrack = plaulist[currentTrackIndex - 1]
      if (currentTrackIndex === 0) {
        return state
      }
      return {
        ...state,
        track: prevTrack,
        plauing: true,
      }
    }

    // воспроизведение трека по кругу
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
