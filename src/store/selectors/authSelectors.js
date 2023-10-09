const authSelector = (store) => store.auth

// Access токен
export const accessTokenSelector = (store) => authSelector(store).accessToken
