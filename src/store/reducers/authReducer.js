import { USER_LOGIN } from '../actions/types/constants'

const initialState = {
  logInState: false,
  access: '',
  refresh: '',
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
        access: data.access,
        refresh: data.refresh,
        first_name: data.first_name,
        last_name: data.last_name,
      }
    }

    default:
      return state
  }
}
