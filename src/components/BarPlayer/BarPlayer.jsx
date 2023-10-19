import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatTime } from '../Playlist/Playlist'
import {
  currentTrackSelector,
  isPlauingSelector,
  isShuffledSelector,
  playListSelector,
} from '../../store/selectors/audioplayerSelectors'
import {
  nextTrack,
  prevTrack,
  togglePause,
  toggleShuffle,
} from '../../store/actions/creators/audioplayerCreator'
import {
  useLikeTrackMutation,
  useDislikeTrackMutation,
  useGetIdTrackQuery,
} from '../../services/servicesApi'
import * as S from './BarPlayer.styles'
import { idUserSelector } from '../../store/selectors/authSelectors'

export const BarPlayer = () => {
  const audioElem = useRef(null)
  const dispatch = useDispatch()
  const trackInPlayer = useSelector(currentTrackSelector)
  const plauing = useSelector(isPlauingSelector)
  const [volume, setvolume] = useState(0.1)
  const [play5sec, setPlay5sec] = useState(false)
  const playlist = useSelector(playListSelector)

  //   громкость
  const volumeChange = (newVolume) => {
    setvolume(newVolume)
    audioElem.current.volume = newVolume
  }

  // обработчик кнопки ПАУЗА
  useEffect(() => {
    if (trackInPlayer) {
      if (plauing) {
        audioElem.current.play()
      } else {
        audioElem.current.pause()
      }
    }
  }, [plauing])

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

  //   перемотка
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

  // клик по прогрессу для перемотки трека
  const clickRef = useRef()
  const checkWidth = (e) => {
    const width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    const divProgress = (offset / width) * 100
    setProgress((divProgress / 100) * duration.length)
  }

  // сброс shuffle при изменении плейлиста
  useEffect(() => {
    dispatch(toggleShuffle('off'))
  }, [playlist])

  // кнопка включения трека по кругу
  const [loop, setLoop] = useState(false)
  const toggleLoop = () => {
    setLoop(!loop)
  }

  // лайкер в плеере
  const idUser = useSelector(idUserSelector)
  const { data } = useGetIdTrackQuery(trackInPlayer.id)
  const isLike = (data?.stared_user ?? []).find(({ id }) => id === idUser)

  return (
    <>
      <audio
        autoPlay
        controls
        ref={audioElem}
        onTimeUpdate={onPlaying}
        style={{ display: 'none' }}
        src={trackInPlayer?.track_file}
        loop={loop ? 'loop' : ''}
      >
        <track kind="captions" />
      </audio>

      <S.Bar>
        <S.BarPlayerTime>
          {formatTime(audioElem.current?.currentTime)} /
          {formatTime(duration.length)}
        </S.BarPlayerTime>
        <S.BarContent>
          <S.BarPlayerProgress onClick={checkWidth} ref={clickRef}>
            <S.BarPlayerProgressInside
              style={{ width: `${duration.progress}%` }}
            />
          </S.BarPlayerProgress>
          <S.BarPlayerBlock>
            <S.BarPlayer>
              <PlayerButtons
                togglePrevTreck={togglePrevTreck}
                loop={loop}
                toggleLoop={toggleLoop}
              />
              <S.BarPlayerTrackPlay>
                <TrackPlay track={trackInPlayer} />
                <Likes
                  isLike={isLike}
                  like={trackInPlayer.like}
                  trackId={trackInPlayer.id}
                />
              </S.BarPlayerTrackPlay>
            </S.BarPlayer>
            <S.BarVolumeBlock>
              <VolumeSlider volume={volume} volumeChange={volumeChange} />
            </S.BarVolumeBlock>
          </S.BarPlayerBlock>
        </S.BarContent>
      </S.Bar>
    </>
  )
}

// кнопки плеера
const PlayerButtons = ({ togglePrevTreck, loop, toggleLoop }) => {
  const plauing = useSelector(isPlauingSelector)
  const shuffled = useSelector(isShuffledSelector)
  const dispatch = useDispatch()

  return (
    <S.PlayerControls>
      <S.PlayerBtnPrev onClick={togglePrevTreck}>
        <S.PlayerBtnPrevSvg alt="prev">
          <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
        </S.PlayerBtnPrevSvg>
      </S.PlayerBtnPrev>
      <S.PlayerBtnPlay onClick={() => dispatch(togglePause())}>
        <S.PlayerBtnPlaySvg alt="play">
          <use
            xlinkHref={`/img/icon/sprite.svg#icon-${
              plauing ? 'pause' : 'play'
            }`}
          />
        </S.PlayerBtnPlaySvg>
      </S.PlayerBtnPlay>
      <S.PlayerBtnNext onClick={() => dispatch(nextTrack())}>
        <S.PlayerBtnNextSvg alt="next">
          <use xlinkHref="/img/icon/sprite.svg#icon-next" />
        </S.PlayerBtnNextSvg>
      </S.PlayerBtnNext>
      <S.PlayerBtnRepeat onClick={toggleLoop} className=" _btn-icon">
        <S.PlayerBtnRepeatSvg
          style={{ stroke: `${loop ? '#ACACAC' : '#696969'}` }}
          alt="repeat"
        >
          <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
        </S.PlayerBtnRepeatSvg>
      </S.PlayerBtnRepeat>
      <S.PlayerBtnShuffle
        onClick={() => dispatch(toggleShuffle())}
        className=" _btn-icon"
      >
        <S.PlayerBtnShuffleSvg
          style={{ stroke: `${shuffled ? '#ACACAC' : '#696969'}` }}
          alt="shuffle"
        >
          <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
        </S.PlayerBtnShuffleSvg>
      </S.PlayerBtnShuffle>
    </S.PlayerControls>
  )
}

const TrackPlay = ({ track }) => (
  <S.TrackPlayContain>
    <S.TrackPlayImage>
      <S.TrackPlaySvg alt="music">
        <use
          xlinkHref={
            track?.logo ? track.logo : '/img/icon/sprite.svg#icon-note'
          }
        />
      </S.TrackPlaySvg>
    </S.TrackPlayImage>
    <S.TrackPlayAuthor>
      <S.TrackPlayAuthorLink href="http://">
        {track?.author}
      </S.TrackPlayAuthorLink>
    </S.TrackPlayAuthor>
    <S.TrackPlayAlbum>
      <S.TrackPlayAlbumLink href="http://">{track?.name}</S.TrackPlayAlbumLink>
    </S.TrackPlayAlbum>
  </S.TrackPlayContain>
)

const Likes = ({ trackId, isLike }) => {
  const [likeTrack] = useLikeTrackMutation()
  const [dislikeTrack] = useDislikeTrackMutation()
  const toggleLike = () => {
    if (isLike) {
      dislikeTrack(trackId)
    } else {
      likeTrack(trackId)
    }
  }
  return (
    <S.TrackPlayLikesDis>
      <S.TrackPlayLikes className=" _btn-icon">
        <S.TrackPlayLikesSvg
          onClick={toggleLike}
          className="track-play__like-svg"
          alt="like"
          style={{
            stroke: `${isLike ? '#B672FF' : ''}`,
            fill: `${isLike ? '#B672FF' : ''}`,
          }}
        >
          <use xlinkHref="/img/icon/sprite.svg#icon-like" />
        </S.TrackPlayLikesSvg>
      </S.TrackPlayLikes>
    </S.TrackPlayLikesDis>
  )
}

// громкость
const VolumeSlider = ({ volume, volumeChange }) => {
  const [tempVolume, setTempVolume] = useState(null)
  const toggleVolume = () => {
    if (volume) {
      setTempVolume(+volume)
      volumeChange(0)
    } else {
      volumeChange(tempVolume)
    }
  }

  return (
    <S.VolumeContent>
      <S.VolumeImage onClick={toggleVolume}>
        <S.VolumeSvg alt="volume">
          <use
            xlinkHref={`/img/icon/sprite.svg#icon-volume${
              +volume ? '' : 'non'
            }`}
          />
        </S.VolumeSvg>
      </S.VolumeImage>
      <S.VolumeProgress className=" _btn">
        <S.VolumeProgressLine
          className=" _btn"
          type="range"
          name="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => {
            volumeChange(+e.target.value)
          }}
        />
      </S.VolumeProgress>
    </S.VolumeContent>
  )
}
