import {
	ADD_PLAYLIST,
	SET_CURRENT_TRACK,
	TOGGLE_PAUSE,
	NEXT_TRACK,
	PREV_TRACK,
	SHUFFLE_PLAYLIST,
} from '../actions/types/constants'
import { AudioplayerState, TrackType } from '../../types'

interface AudioplayerAction {
	type: string;
	payload: {
		playlist: TrackType[];
		track: TrackType ;
		id: number;
		status: boolean;
	};
}

const initialState = {
	playing: false,
	playlist: [],
	track: null,
	shuffled: false,
	shuffledPlaylist: [],
}

export default function audioplayerReducer(state = initialState, action: AudioplayerAction): AudioplayerState {
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
				playing: true,
			}
		}

		// пауза
		case TOGGLE_PAUSE: {
			return {
				...state,
				playing: !state.playing,
			}
		}

		// следующий трек
		case NEXT_TRACK: {
			const  track  = state.track
			if (!track) return state;
			const { id } = track;
			const playlist: TrackType[] = state.shuffled ? state.shuffledPlaylist : state.playlist
			const currentTrackIndex = playlist.findIndex((track) => track.id === id)
			const newTrack = playlist[currentTrackIndex + 1]
			if (!newTrack) {
				return state
			}
			return {
				...state,
				track: newTrack,
				playing: true,
			}
		}

		// предыдущий трек
		case PREV_TRACK: {
			const  track  = state.track
			if (!track) return state;
			const { id } = track;
			const plaulist: TrackType[] = state.shuffled ? state.shuffledPlaylist : state.playlist
			const currentTrackIndex = plaulist.findIndex((track) => track.id === id)
			const prevTrack = plaulist[currentTrackIndex - 1]
			if (currentTrackIndex === 0) {
				return state
			}
			return {
				...state,
				track: prevTrack,
				playing: true,
			}
		}

		// перемешать треки в плейлисте
		case SHUFFLE_PLAYLIST: {
			const { status } = action.payload
			const newShuffled = typeof status === 'boolean' ? status : !state.shuffled;
			return {
				...state,
				shuffled: newShuffled,
				shuffledPlaylist: [...state.playlist].sort(() => 0.5 - Math.random()),
			}
		}

		default:
			return state
	}
}
