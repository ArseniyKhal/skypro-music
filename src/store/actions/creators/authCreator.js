import { SET_TOKENS, SET_ACC_TOKEN, USER_LOGIN } from '../types/constants'

// запись access и refresh токена в стейт
export const setTokens = (tokens) => ({
  type: SET_TOKENS,
  payload: { tokens },
})

// перезапись access токена в стейт
export const setAccessToken = (accToken) => ({
  type: SET_ACC_TOKEN,
  payload: { accToken },
})

// запись данных пользователя в стейт
export const logInState = (data) => ({
  type: USER_LOGIN,
  payload: { data },
})
