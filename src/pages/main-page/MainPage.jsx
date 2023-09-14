import { useEffect, useState } from 'react'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { getPlaylist } from '../../api'
import * as S from '../../App.styles'

export function Main() {
  // загрузка списка треков
  const [playlistMusic, setPlaylistMusic] = useState([])
  const [getPlaylistError, setGetPlaylistError] = useState(null)
  useEffect(() => {
    getPlaylist().then(
      (data) => {
        setPlaylistMusic(data)
      },
      () => {
        setGetPlaylistError(
          'Не удалось загрузить плейлист, попробуйте позже: NetworkError when attempting to fetch resource.',
        )
      },
    )
  }, [])
  // Загрузка 5 сек
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])
  // скрыть/показать плеер
  const [visiblePlayer, setVisiblePlayer] = useState(false)
  // воспроизводимый трек
  const [trackInPlayer, setTrackInPlayer] = useState(null)
  const openPlayer = ({ name, author, logo, trackFile }) => {
    setTrackInPlayer({ name, author, logo, trackFile })
    setVisiblePlayer(true)
  }

  return (
    <>
      <S.Main>
        <NavMenu />
        <Centerblock
          isLoading={isLoading}
          playlistMusic={playlistMusic}
          openPlayer={openPlayer}
          getPlaylistError={getPlaylistError}
        />
        <Sidebar isLoading={isLoading} />
      </S.Main>
      {visiblePlayer && (
        <BarPlayer isLoading={isLoading} trackInPlayer={trackInPlayer} />
      )}
      <footer />
    </>
  )
}
