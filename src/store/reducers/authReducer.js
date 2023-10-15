import { USER_LOGIN, SET_ACC_TOKEN } from '../actions/types/constants'

const initialState = {
  logInState: false,
  accessToken: '',
  refreshToken: '',
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  id: '',
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // logInState/logOut юзера
    case USER_LOGIN: {
      const { data } = action.payload
      return {
        ...state,
        logInState: !!data,
        username: data.username,
        email: data.email,
        id: data.id,
        accessToken: data.access,
        refreshToken: data.refresh,
        firstName: data.first_name,
        lastName: data.last_name,
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

    default:
      return state
  }
}
