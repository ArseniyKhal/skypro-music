import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetTracksQuery } from '../../services/servicesApi'
import {
  addPlaylist,
  nextTrack,
  prevTrack,
  isLoadingData,
  setToken,
} from '../../store/actions/creators/tracksCreator'
import {
  isPlauingSelector,
  //   playListSelector,
  currentTrackSelector,
  isLoopSelector,
} from '../../store/selectors/tracksSelectors'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import {
  // getPlaylist,
  getToken,
} from '../../api'
import * as S from '../../App.styles'

// Задачи:
// сделать правильное отображение времени трека в списке
// сделать время на прогрессе при наведении
// нарисовать ОШИБКА ЗАГРУЗКИ ТРЕКОВ
// При обновлении страницы разлогинивается
// отладить адаптивность
// не правильно отображение фильтра по дате

export const Main = () => {
  const {
    data,
    // error, isLoading
  } = useGetTracksQuery()
  const playlist = data

  // загрузка списка треков
  const [volume, setvolume] = useState(0.3)
  const [getPlaylistError, setGetPlaylistError] = useState(null)
  const [play5sec, setPlay5sec] = useState(false)
  const dispatch = useDispatch()
  const audioElem = useRef(null)
  const plauing = useSelector(isPlauingSelector)
  const trackInPleer = useSelector(currentTrackSelector)
  const isLoop = useSelector(isLoopSelector)

  const GetToken = async () => {
    await getToken()
      .then((response) => response.json())
      .then((tokens) => {
        dispatch(setToken(tokens))
        dispatch(addPlaylist(playlist))
      })
  }

  // загрузка треков с API
  const fetchTracks = async () => {
    try {
      dispatch(isLoadingData(true))
      setGetPlaylistError('')
      // const tracks = await getPlaylist()
      // console.log(tracks)
      if (playlist) {
        //   dispatch(addPlaylist(tracks))
        GetToken()
      }
    } catch (error) {
      console.error(error)
      setGetPlaylistError(
        `Не удалось загрузить плейлист, попробуйте позже. Ошибка: ${error.message}`,
      )
    } finally {
      dispatch(isLoadingData(false))
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
        <Centerblock getPlaylistError={getPlaylistError} />
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
