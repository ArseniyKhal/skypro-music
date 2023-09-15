import { useEffect, useState } from 'react'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { getPlaylist } from '../../api'
// import { playlistMusicData } from '../../data'
import * as S from '../../App.styles'

export const Main = () => {
  // загрузка списка треков
  const [playlistMusic, setPlaylistMusic] = useState([])
  const [getPlaylistError, setGetPlaylistError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchTracks = async () => {
    try {
      setIsLoading(true)
      setGetPlaylistError('')
      const tracks = await getPlaylist()
      setPlaylistMusic(tracks)
    } catch (error) {
      console.error(error)
      setGetPlaylistError(
        `Не удалось загрузить плейлист, попробуйте позже. Ошибка: ${error.message}`,
      )
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTracks()
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
      {visiblePlayer && <BarPlayer trackInPlayer={trackInPlayer} />}
      <footer />
    </>
  )
}
