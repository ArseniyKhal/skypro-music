import { useEffect, useState } from 'react'
import NavMenu from '../../components/NavMenu/NavMenu'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import BarPlayer from '../../components/BarPlayer/BarPlayer'
import playlistMusic from '../../data'
import * as S from '../../App.styles'

export default function HomePage() {
  // Загрузка 5 сек
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
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
