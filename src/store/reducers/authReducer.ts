import { USER_LOGIN, TGL_THEME } from '../actions/types/constants'
import { AuthState } from '../../types'
const isDarkTheme = window?.matchMedia('(prefers-color-scheme:dark)').matches
const defaultTheme: 'dark' | 'light' = isDarkTheme ? 'dark' : 'light'

interface ToggleThemeAction {
	type: typeof TGL_THEME;
}

interface UserLoginAction {
	type: string;
	payload: {
		data: AuthState;
	};
}

type AuthActionTypes = UserLoginAction | ToggleThemeAction;

const initialState = {
	access: null,
	refresh: null,
	username: null,
	firstName: null,
	lastName: null,
	email: null,
	id: null,
	theme: defaultTheme,
}

export default function authReducer(state = initialState, action: AuthActionTypes): AuthState {
	switch (action.type) {
		// logInState/logOut юзера
		case USER_LOGIN: {
			const { data } = action.payload
			return {
				...state,
				username: data?.username,
				email: data?.email,
				id: data?.id,
				access: data?.access,
				refresh: data?.refresh,
				firstName: data?.firstName,
				lastName: data?.lastName,
			}
		}
		// смена темы
		case TGL_THEME: {
			return {
				...state,
				theme: state.theme === 'dark' ? 'light' : 'dark',
			}
		}

		default:
			return state
	}
}
