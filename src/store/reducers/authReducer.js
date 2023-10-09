import { SET_TOKEN, USER_LOGIN } from '../actions/types/constants'

const initialState = {
  logIn: false,
  accessToken: '',
  refreshToken: '',
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // получаем токены и записываем в state
    case SET_TOKEN: {
      const { tokens } = action.payload
      return {
        ...state,
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      }
    }

    // logIn/logOut юзер
    case USER_LOGIN: {
      const { data } = action.payload
      return {
        ...state,
        logIn: data,
      }
    }

    default:
      return state
  }
}
