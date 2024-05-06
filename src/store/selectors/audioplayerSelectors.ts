import { RootState } from '../../types'

const audioplayerSelector = (store: RootState) => store.audioplayer

// список треков с API
export const playListSelector = (store: RootState) => audioplayerSelector(store)?.playlist

// текущий трек в плеере
export const currentTrackSelector = (store: RootState) => audioplayerSelector(store)?.track

// статус воспроизведения
export const isPlauingSelector = (store: RootState) => audioplayerSelector(store)?.playing

// статус воспроизведения в перемешку
export const isShuffledSelector = (store: RootState) => audioplayerSelector(store).shuffled
