import { useEffect, useState, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  nextTrack,
  prevTrack,
} from '../../store/actions/creators/audioplayerCreator'
import {
  isPlauingSelector,
  currentTrackSelector,
  isLoopSelector,
} from '../../store/selectors/audioplayerSelectors'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import * as S from '../../App.styles'

// Задачи:
// сделать правильное отображение времени трека в списке
// сделать время на прогрессе при наведении
// нарисовать ОШИБКА ЗАГРУЗКИ ТРЕКОВ
// При обновлении страницы разлогинивается
// отладить адаптивность
// неправильно отображение фильтра по дате
// getPlaylistError надо?
// перенести AUDIO в пллер

export const Main = () => {
  const dispatch = useDispatch()
  const [volume, setvolume] = useState(0.3)
  //   const [getPlaylistError, setGetPlaylistError] = useState(null)
  const [play5sec, setPlay5sec] = useState(false)
  const audioElem = useRef(null)
  const plauing = useSelector(isPlauingSelector)
  const trackInPleer = useSelector(currentTrackSelector)
  const isLoop = useSelector(isLoopSelector)

  // загрузка треков с API
  //   const fetchTracks = async () => {
  //     try {
  //       setGetPlaylistError('')
  //		const tracks = await getPlaylist()
  //       if (playlist) {
  //       }
  //     } catch (error) {
  //       console.error(error)
  //       setGetPlaylistError(
  //         `Не удалось загрузить плейлист, попробуйте позже. Ошибка: ${error.message}`,
  //       )
  //     }
  //     //  finally {    }
  //   }

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
        <Outlet />
        <Sidebar />
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
    </>
  )
}
