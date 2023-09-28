const audioplayerSelector = (store) => store.audioplayer
const trackSelector = (store) => store.track

// список треков с API
export const playListSelector = (store) =>
  audioplayerSelector(store)?.playlist || []

// трек в плеере
export const currentTrack = (store) => audioplayerSelector(store)?.track || {}

export const trackIdsSelector = (store) => trackSelector(store)?.allIds || []

export const trackByIdSelector = (store, id) => {
  const trackStore = trackSelector(store)

  if (!trackStore) {
    return {}
  }

  const trackItem = trackStore.byIds[id]

  return {
    ...trackItem,
    id,
  }
}

export const tracksSelector = (store) =>
  trackIdsSelector(store).map((id) => trackByIdSelector(store, id))
