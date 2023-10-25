import { USER_LOGIN, TGL_THEME } from '../types/constants'

// запись данных пользователя в стейт
export const logInState = (data) => ({
  type: USER_LOGIN,
  payload: { data },
})

// смена темы
export const toggleThemeStore = () => ({
  type: TGL_THEME,
})
