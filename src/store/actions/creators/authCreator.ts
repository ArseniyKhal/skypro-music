import { USER_LOGIN, TGL_THEME } from '../types/constants'
import {  AuthState } from '../../../types'


// запись данных пользователя в стейт
export const logInState = (data: AuthState | null) => ({
	type: USER_LOGIN,
	payload: { data },
})

// смена темы
export const toggleThemeStore = () => ({
	type: TGL_THEME,
})
