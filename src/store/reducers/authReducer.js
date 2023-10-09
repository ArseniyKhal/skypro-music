import { SET_TOKEN, USER_LOGIN } from '../actions/types/constants'

const initialState = {
  logIn: false,
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

    // logIn/logOut юзера
    case USER_LOGIN: {
      const { data } = action.payload
      console.log(data)
      return {
        ...state,
        logIn: data,
        username: data.username,
        email: data.email,
        id: data.id,
      }
    }

    default:
      return state
  }
}
