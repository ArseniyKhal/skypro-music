import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPlaylist,
  //   togglePause,
} from '../../store/actions/creators/tracksCreator'
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
// Как вызвать функцию при изменении store?
// При обновлении страницы разлогинивается
// почему Dispatch загрузки плейлиста проиходит дважды при загрузке?

export const Main = () => {
  const playlist = useSelector((state) => state.audioplayer.playlist)

  // загрузка списка треков
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
      if (playlist) {
        dispatch(addPlaylist(tracks))
      }
      // dfgh
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
  const audioElem = useRef(null)
  const plauing = useSelector((state) => state.audioplayer.plauing)

  // предыдущий трек (не реализовано)
  const handlePrev = () => {
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

  const trackInPleer = useSelector((state) => state.audioplayer.track)

  // добавление и запуск трека в плеере
  useEffect(() => {
    audioElem.current.load()
    if (trackInPleer) {
      audioElem.current.play()
    }
  }, [trackInPleer])

  // обработчик кнопки ПАУЗА
  useEffect(() => {
    if (trackInPleer) {
      if (plauing) {
        audioElem.current.play()
      } else {
        audioElem.current.pause()
      }
    }
  }, [plauing])

  // громкость
  const handleVolumeChange = (newVolume) => {
    setvolume(newVolume)
    audioElem.current.volume = newVolume
  }

  // полоска прогресса трека
  const [duration, setDuration] = useState({})
  const onPlaying = () => {
    const durationTime = audioElem.current.duration
    const ct = audioElem.current.currentTime
    setDuration({
      length: durationTime,
      progress: (ct / durationTime) * 100,
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
        <source src={trackInPleer?.track_file} type="audio/mpeg" />
        <track kind="captions" />
      </audio>

      <S.Main>
        <NavMenu />
        <Centerblock
          isLoading={isLoading}
          getPlaylistError={getPlaylistError}
        />
        <Sidebar isLoading={isLoading} />
      </S.Main>
      {trackInPleer && (
        <BarPlayer
          toggleLoop={toggleLoop}
          handlePrev={handlePrev}
          volume={volume}
          volumeChange={handleVolumeChange}
          setProgress={setProgress}
          isLoop={isLoop}
          toggleShuffle={toggleShuffle}
          isShuffle={isShuffle}
          audioElem={audioElem}
          duration={duration}
        />
      )}
      <footer />
    </>
  )
}
