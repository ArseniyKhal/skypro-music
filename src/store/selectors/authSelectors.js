const authSelector = (store) => store.auth

// Access токен
export const accessTokenSelector = (store) => authSelector(store).accessToken

// ID юзера
export const idUserSelector = (store) => authSelector(store).id
