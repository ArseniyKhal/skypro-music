import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addPlaylist } from '../../store/actions/creators/tracksCreator'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { getPlaylist } from '../../api'
import * as S from '../../App.styles'

// Задачи:
// сделать правильное отображение времени трека в списке
// сделать время на прогрессе при наведении
// нарисовать ОШИБКА ЗАГРУЗКИ ТРЕКОВ

export const Main = () => {
  // загрузка списка треков
  const [playlistMusic, setPlaylistMusic] = useState([])
  const [volume, setvolume] = useState(0.5)
  const [getPlaylistError, setGetPlaylistError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  // загрузка треков с API
  const fetchTracks = async () => {
    try {
      setIsLoading(true)
      setGetPlaylistError('')
      const tracks = await getPlaylist()
      // console.log(tracks)
      dispatch(addPlaylist(tracks))
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
  // предыдущий трек (не реализовано)
  const handlePrev = () => {
    alert('еще не реализовано')
  }
  // следующий трек (не реализовано)
  const handleNext = () => {
    alert('еще не реализовано')
  }
  // переключатель В Перемешку (не реализовано)
  const [isShuffle, setIsShuffle] = useState(false)
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle)
    alert('еще не реализовано')
  }

  // залупливание
  const [isLoop, setIsLoop] = useState(false)
  const toggleLoop = () => {
    setIsLoop(!isLoop)
  }

  // добавление и запуск трека в плеере
  const [trackInPlayer, setTrackInPlayer] = useState(null)
  const [trackUrl, setTrackUrl] = useState(null)
  const addTrackInPlayer = ({ trackFile, id }) => {
    setTrackUrl(trackFile)
    setTrackInPlayer(playlistMusic.filter((item) => item.id === id)[0])
    handleLoad()
    handleStart()
  }

  // громкость
  const handleVolumeChange = (newVolume) => {
    setvolume(newVolume)
    audioElem.current.volume = newVolume
  }

  // полоска прогресса трека
  const onPlaying = () => {
    const durationTime = audioElem.current.duration
    const ct = audioElem.current.currentTime
    setTrackInPlayer({
      ...trackInPlayer,
      progress: (ct / durationTime) * 100,
      length: durationTime,
    })
  }

  // перемотка
  const setProgress = (pr) => {
    audioElem.current.currentTime = pr
  }

  return (
    <>
      <audio
        controls
        ref={audioElem}
        onTimeUpdate={onPlaying}
        style={{ display: 'none' }}
        loop={`${isLoop ? 'loop' : ''}`}
      >
        <source src={trackUrl} type="audio/mpeg" />
        <track kind="captions" src={trackUrl} />
      </audio>

      <S.Main>
        <NavMenu />
        <Centerblock
          isLoading={isLoading}
          addTrackInPlayer={addTrackInPlayer}
          getPlaylistError={getPlaylistError}
        />
        <Sidebar isLoading={isLoading} />
      </S.Main>
      {trackInPlayer && (
        <BarPlayer
          trackInPlayer={trackInPlayer}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          toggleLoop={toggleLoop}
          handlePrev={handlePrev}
          handleNext={handleNext}
          volume={volume}
          volumeChange={handleVolumeChange}
          setProgress={setProgress}
          isLoop={isLoop}
          toggleShuffle={toggleShuffle}
          isShuffle={isShuffle}
          audioElem={audioElem}
        />
      )}
      <footer />
    </>
  )
}
