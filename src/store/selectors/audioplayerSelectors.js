const audioplayerSelector = (store) => store.audioplayer

// список треков с API
export const playListSelector = (store) => audioplayerSelector(store)?.playlist

// перемешанный список треков с API
export const playListShuffleSelector = (store) =>
  audioplayerSelector(store).shuffledPlaylist

// текущий трек в плеере
export const currentTrackSelector = (store) => audioplayerSelector(store)?.track

// статус воспроизведения
export const isPlauingSelector = (store) => audioplayerSelector(store)?.plauing

// статус воспроизведения по кругу
export const isLoopSelector = (store) => audioplayerSelector(store)?.loop

// статус воспроизведения в перемешку
export const isShuffledSelector = (store) => audioplayerSelector(store).shuffled
