// export interface UserType {
// 	email: string;
// 	username: string;
// 	access: string;
// 	firstName: string | null;
// 	lastName: string | null;
// 	id: number;
// 	refresh: string;
// 	themeDark: boolean;
// }

interface TrackStaredUser {
	email: string
	first_name?: string
	id: number
	last_name?: string
	username: string
}

export interface TrackType {
	album?: string;
	author: string
	duration_in_seconds: number
	genre?: string | undefined;
	id: number
	logo?: string
	name: string
	release_date?: string
	stared_user: TrackStaredUser[]
	track_file: string
}

export interface TrackComponentType {
	track: TrackType,
	playlist: TrackType[],
	key?: number
}

export interface MusicFilterComponentType {
	setMusic: React.Dispatch<React.SetStateAction<TrackType[]>>,
	musicList: TrackType[],
	isLoading: boolean
}

interface MusicFilterAndSort {
	title: string
	filterList: string[]
	isLoading: boolean
	visibleFilter: string | null
	toggleVisibleFilter: (filter: string) => void
}

export interface MusicFilterItemType extends MusicFilterAndSort {
	authorFilter: string[]
	setAuthorFilter: React.Dispatch<React.SetStateAction<string[]>>
	genreFilter: string[]
	setGenreFilter: React.Dispatch<React.SetStateAction<string[]>>
}

export interface MusicSortItemType extends MusicFilterAndSort {
	selectedSort: string
	setSelectedSort: React.Dispatch<React.SetStateAction<string>>
}

export interface AuthState {
	username: string | null;
	email: string | null;
	id: number | null;
	access: string | null;
	refresh: string | null;
	firstName: string | null;
	lastName: string | null;
	theme: 'dark' | 'light';
}

export interface AudioplayerState {
	playing: boolean;
	playlist: TrackType[];
	track: TrackType | null;
	shuffled: boolean;
	shuffledPlaylist: TrackType[];
}

export interface RootState {
	auth: AuthState;
	audioplayer: AudioplayerState;
}