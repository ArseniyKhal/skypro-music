import {
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
  TOGGLE_PAUSE,
  NEXT_TRACK,
  PREV_TRACK,
  REPEAT_PLAYLIST,
  SHUFFLE_PLAYLIST,
} from '../actions/types/constants'

const initialState = {
  plauing: false,
  playlist: [],
  track: null,
  isLike: false,
  loop: false,
  shuffled: false,
  shuffledPlaylist: [],
  playlistFilter: {
    author: [],
    genre: [],
  },
}

export default function audioplayerReducer(state = initialState, action) {
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
      const { track } = action.payload
      return {
        ...state,
        track,
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
      const { status } = action.payload
      return {
        ...state,
        loop: status ? false : !state.loop,
      }
    }

    // перемешать треки в плейлисте
    case SHUFFLE_PLAYLIST: {
      const { status } = action.payload
      return {
        ...state,
        shuffled: status ? false : !state.shuffled,
        shuffledPlaylist: [...state.playlist].sort(() => 0.5 - Math.random()),
      }
    }

    default:
      return state
  }
}
