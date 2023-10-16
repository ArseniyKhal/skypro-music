import { USER_LOGIN } from '../types/constants'

// запись данных пользователя в стейт
export const logInState = (data) => ({
  type: USER_LOGIN,
  payload: { data },
})
