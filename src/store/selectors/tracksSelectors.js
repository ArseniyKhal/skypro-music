const audioplayerSelector = (store) => store.audioplayer

// список треков с API
export const playListSelector = (store) =>
  audioplayerSelector(store)?.playlist || []

// трек в плеере
export const currentTrack = (store) => audioplayerSelector(store)?.track || {}
