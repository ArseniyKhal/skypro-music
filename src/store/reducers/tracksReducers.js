import {
  ADD_TRACKS,
  PLAY_TRACK,
  ADD_PLAYLIST,
  SET_CURRENT_TRACK,
} from '../actions/types/tracks'

const initialState = {
  plauing: false,
  playlist: [],
  track: {},
  allIds: [],
  byIds: {},
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
      const { id, name, author, logo, trackFile } = action.payload
      return {
        ...state,
        track: { id, name, author, logo, trackFile },
        plauing: true,
      }
    }

    case ADD_TRACKS: {
      const { id, content } = action.payload

      return {
        ...state,

        allIds: [...state.allIds, id],

        byIds: {
          ...state.byIds,

          [id]: {
            content,
            complete: false,
          },
        },
      }
    }

    case PLAY_TRACK: {
      const { id } = action.payload

      const playTrack = state.byIds[id]

      return {
        ...state,

        byIds: {
          ...state.byIds,
          [id]: {
            ...playTrack,
            completed: !playTrack.completed,
          },
        },
      }
    }

    default:
      return state
  }
}
