import {
  SET_TOKENS,
  SET_ACC_TOKEN,
  USER_LOGIN,
} from '../actions/types/constants'

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
    case SET_TOKENS: {
      const { tokens } = action.payload
      return {
        ...state,
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      }
    }

    // перезапись access токена в стейт
    case SET_ACC_TOKEN: {
      const { accToken } = action.payload
      return {
        ...state,
        accessToken: accToken,
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
