import { useEffect, useState, useRef } from 'react'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { getPlaylist } from '../../api'
import * as S from '../../App.styles'

// До изменения громкости нет значения громкости в стейте
// почему AUDIO не хочет напрямую читать URL trackInPlayer.track_file
// сделать правильное отображение времени трека

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
      // console.log(tracks)
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

  const audioElem = useRef(null)

  const handleStart = () => {
    audioElem.current.play()
    setIsPlaying(true)
  }
  const handleStop = () => {
    audioElem.current.pause()
    setIsPlaying(false)
  }
  const togglePlay = isPlaying ? handleStop : handleStart

  const handleLoad = () => {
    audioElem.current.load()
    togglePlay()
  }

  //   const handlePrev = () => {
  //  alert('еще не реализовано')
  //   }

  // загрузка трека в плеер
  const [trackInPlayer, setTrackInPlayer] = useState(null)
  const [trackUrl, setTrackUrl] = useState(null)
  const playTrackInPlayer = ({ trackFile, id }) => {
    setTrackUrl(trackFile)
    setTrackInPlayer(playlistMusic.filter((item) => item.id === id)[0])
    handleLoad()
    setVisiblePlayer(true)
    handleStart()
  }

  // громкость
  const volumeSound = (volume) => {
    audioElem.current.volume = volume
    console.log(volume)
  }

  // полоска прогресса трека
  const onPlaying = () => {
    const { duration } = audioElem.current
    const ct = audioElem.current.currentTime
    setTrackInPlayer({
      ...trackInPlayer,
      progress: (ct / duration) * 100,
      length: duration,
    })
  }

  // перемотка
  const setProgress = (pr) => {
    audioElem.current.currentTime = pr
  }

  // залупливание
  const [isLoop, setIsLoop] = useState(false)
  const toggleLoop = () => {
    //  if (isLoop) {
    //  } else {
    //  }

    setIsLoop(!isLoop)
  }

  return (
    <>
      <audio
        controls
        ref={audioElem}
        onTimeUpdate={onPlaying}
        style={{ visibility: 'hidden' }}
        loop={`${isLoop ? 'loop' : ''}`}
      >
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
          toggleLoop={toggleLoop}
          volumeSound={volumeSound}
          setProgress={setProgress}
          isLoop={isLoop}
        />
      )}
      <footer />
    </>
  )
}
