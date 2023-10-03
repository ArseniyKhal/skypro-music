import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPlaylist,
  nextTrack,
  prevTrack,
} from '../../store/actions/creators/tracksCreator'
import {
  isPlauingSelector,
  playListSelector,
  currentTrackSelector,
  isLoopSelector,
} from '../../store/selectors/tracksSelectors'
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

export const Main = () => {
  const playlist = useSelector(playListSelector)

  // загрузка списка треков
  const [volume, setvolume] = useState(0.5)
  const [getPlaylistError, setGetPlaylistError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [play5sec, setPlay5sec] = useState(false)
  const dispatch = useDispatch()
  const audioElem = useRef(null)
  const plauing = useSelector(isPlauingSelector)
  const trackInPleer = useSelector(currentTrackSelector)
  const isLoop = useSelector(isLoopSelector)

  // загрузка треков с API
  const fetchTracks = async () => {
    try {
      setIsLoading(true)
      setGetPlaylistError('')
      const tracks = await getPlaylist()
      if (playlist) {
        dispatch(addPlaylist(tracks))
      }
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

  // добавление и автозапуск трека в плеере
  useEffect(() => {
    audioElem.current.load()
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

    // переходим на следующий трек, если этот закончился
    if (durationTime === ct) {
      dispatch(nextTrack())
    }
    // для 5сек-отметки
    if (ct > 5) {
      setPlay5sec(true)
    } else {
      setPlay5sec(false)
    }
  }
  // перемотка
  const setProgress = (pr) => {
    audioElem.current.currentTime = pr
  }

  // если трек воспроизводится 5 сек, то PrevTreck переключит на начало песни
  const togglePrevTreck = () => {
    if (play5sec) {
      setProgress(0)
    } else {
      dispatch(prevTrack())
    }
  }

  return (
    <>
      <audio
        autoPlay
        controls
        ref={audioElem}
        onTimeUpdate={onPlaying}
        style={{ display: 'none' }}
        src={trackInPleer?.track_file}
        loop={isLoop ? 'loop' : ''}
      >
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
          volume={volume}
          volumeChange={handleVolumeChange}
          setProgress={setProgress}
          togglePrevTreck={togglePrevTreck}
          audioElem={audioElem}
          duration={duration}
        />
      )}
      <footer />
    </>
  )
}
