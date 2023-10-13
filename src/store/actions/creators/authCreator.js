import { USER_LOGIN, SET_ACC_TOKEN } from '../types/constants'

// запись данных пользователя в стейт
export const logInState = (data) => ({
  type: USER_LOGIN,
  payload: { data },
})

// перезапись access токена в стейт
export const setAccessToken = (accToken) => ({
  type: SET_ACC_TOKEN,
  payload: { accToken },
})
