import { RootState } from '../../types'

const authSelector = (store: RootState) => store.auth

// ID юзера
export const idUserSelector = (store: RootState) => authSelector(store).id

// Имя юзера
export const nameUserSelector = (store: RootState) => authSelector(store).username

// тема
export const themeSelector = (store: RootState) => authSelector(store).theme
