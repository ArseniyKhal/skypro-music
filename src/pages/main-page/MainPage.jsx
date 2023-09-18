import { useEffect, useState, useRef } from 'react'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { getPlaylist } from '../../api'
import * as S from '../../App.styles'

export const Main = () => {
  // загрузка списка треков
  const [playlistMusic, setPlaylistMusic] = useState([])
  const [getPlaylistError, setGetPlaylistError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // загрузка треков с API
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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  // скрыть/показать плеер
  const [visiblePlayer, setVisiblePlayer] = useState(false)
  // воспроизводим трек
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)

  const handleStart = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }
  const handleStop = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }
  const togglePlay = isPlaying ? handleStop : handleStart

  const handleLoad = () => {
    audioRef.current.load()
    togglePlay()
  }

  const [trackInPlayer, setTrackInPlayer] = useState(null)
  const [trackUrl, setTrackUrl] = useState(null)
  const playTrackInPlayer = ({ name, author, logo, trackFile }) => {
    setTrackUrl(trackFile)
    setTrackInPlayer({ name, author, logo, trackFile })
    setVisiblePlayer(true)
    handleLoad()
    handleStart()
  }

  return (
    <>
      <audio controls ref={audioRef} style={{ visibility: 'hidden' }}>
        <source src={trackUrl} type="audio/mpeg" />
        <track kind="captions" src={trackUrl} />
      </audio>

      <S.Main>
        <NavMenu />
        <Centerblock
          isLoading={isLoading}
          playlistMusic={playlistMusic}
          playTrackInPlayer={playTrackInPlayer}
          getPlaylistError={getPlaylistError}
        />
        <Sidebar isLoading={isLoading} />
      </S.Main>
      {visiblePlayer && (
        <BarPlayer
          trackInPlayer={trackInPlayer}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
        />
      )}
      <footer />
    </>
  )
}
