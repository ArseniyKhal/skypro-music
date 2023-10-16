const authSelector = (store) => store.auth

// статус авторизации
export const logInSelector = (store) => authSelector(store).logInState

// Access токен
export const accessTokenSelector = (store) => authSelector(store).accessToken

// Refresh токен
export const refreshTokenSelector = (store) => authSelector(store).refreshToken

// ID юзера
export const idUserSelector = (store) => authSelector(store).id

// Имя юзера
export const nameUserSelector = (store) => authSelector(store).username
