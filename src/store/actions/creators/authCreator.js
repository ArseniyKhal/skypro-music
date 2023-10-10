import { SET_TOKEN, USER_LOGIN } from '../types/constants'

export const setTokens = (tokens) => ({
  type: SET_TOKEN,
  payload: { tokens },
})

export const logInState = (data) => ({
  type: USER_LOGIN,
  payload: { data },
})
