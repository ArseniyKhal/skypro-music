import { SET_TOKEN, USER_LOGIN } from '../actions/types/constants'

const initialState = {
  logInState: false,
  accessToken: '',
  refreshToken: '',
  username: '',
  email: '',
  id: '',
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

    // logInState/logOut юзера
    case USER_LOGIN: {
      const { data } = action.payload
      return {
        ...state,
        logInState: !!data,
        username: data.username,
        email: data.email,
        id: data.id,
      }
    }

    default:
      return state
  }
}
