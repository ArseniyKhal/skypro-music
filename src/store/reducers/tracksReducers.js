import { ADD_TRACKS, PLAY_TRACK, ADD_PLAYLIST } from '../actions/types/tracks'
// 1.
const initialState = {
  plauing: false,
  playlist: [],
  track: {},
  allIds: [],
  byIds: {},
}

// 2.
export default function tracksReducer(state = initialState, action) {
  switch (action.type) {
    // 3.
    case ADD_PLAYLIST: {
      // 4.
      const { playlist } = action.payload

      // 5.
      return {
        ...state,

        playlist,
      }
    }

    case ADD_TRACKS: {
      // 4.
      const { id, content } = action.payload

      // 5.
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
