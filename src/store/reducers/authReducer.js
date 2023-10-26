import { USER_LOGIN, TGL_THEME } from '../actions/types/constants'

const isDarkTheme = window?.matchMedia('(prefers-color-scheme:dark)').matches
const defaultTheme = isDarkTheme ? 'dark' : 'light'

const initialState = {
  access: '',
  refresh: '',
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  id: '',
  theme: defaultTheme,
}

export default function authReducer(state = initialState, action) {
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
        first_name: data?.first_name,
        last_name: data?.last_name,
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
