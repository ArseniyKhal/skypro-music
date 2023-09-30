import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatTime } from '../Centerblock/Centerblock'
import {
  currentTrackSelector,
  isPlauingSelector,
  isLoopSelector,
  isShuffledSelector,
} from '../../store/selectors/tracksSelectors'
import {
  nextTrack,
  prevTrack,
  togglePause,
  toggleRepeat,
  toggleShuffle,
} from '../../store/actions/creators/tracksCreator'
import * as S from './BarPlayer.styles'

export const BarPlayer = ({
  volume,
  volumeChange,
  setProgress,
  audioElem,
  duration,
}) => {
  const track = useSelector(currentTrackSelector)

  // клик по прогрессу для перемотки трека
  const clickRef = useRef()
  const checkWidth = (e) => {
    const width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    const divProgress = (offset / width) * 100
    setProgress((divProgress / 100) * duration.length)
  }

  return (
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
            <PlayerButtons />
            <S.BarPlayerTrackPlay>
              <TrackPlay trackInPlayer={track} />
              <Likes />
            </S.BarPlayerTrackPlay>
          </S.BarPlayer>
          <S.BarVolumeBlock>
            <VolumeSlider volume={volume} volumeChange={volumeChange} />
          </S.BarVolumeBlock>
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  )
}

// кнопки плеера
const PlayerButtons = () => {
  const plauing = useSelector(isPlauingSelector)
  const loop = useSelector(isLoopSelector)
  const shuffled = useSelector(isShuffledSelector)

  const dispatch = useDispatch()

  return (
    <S.PlayerControls>
      <S.PlayerBtnPrev onClick={() => dispatch(prevTrack())}>
        <S.PlayerBtnPrevSvg alt="prev">
          <use xlinkHref="img/icon/sprite.svg#icon-prev" />
        </S.PlayerBtnPrevSvg>
      </S.PlayerBtnPrev>
      <S.PlayerBtnPlay onClick={() => dispatch(togglePause())}>
        <S.PlayerBtnPlaySvg alt="play">
          <use
            xlinkHref={`img/icon/sprite.svg#icon-${plauing ? 'pause' : 'play'}`}
          />
        </S.PlayerBtnPlaySvg>
      </S.PlayerBtnPlay>
      <S.PlayerBtnNext onClick={() => dispatch(nextTrack())}>
        <S.PlayerBtnNextSvg alt="next">
          <use xlinkHref="img/icon/sprite.svg#icon-next" />
        </S.PlayerBtnNextSvg>
      </S.PlayerBtnNext>
      <S.PlayerBtnRepeat
        onClick={() => dispatch(toggleRepeat())}
        className=" _btn-icon"
      >
        <S.PlayerBtnRepeatSvg
          style={{ stroke: `${loop ? '#ACACAC' : '#696969'}` }}
          alt="repeat"
        >
          <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
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
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
        </S.PlayerBtnShuffleSvg>
      </S.PlayerBtnShuffle>
    </S.PlayerControls>
  )
}

const TrackPlay = ({ trackInPlayer }) => (
  <S.TrackPlayContain>
    <S.TrackPlayImage>
      <S.TrackPlaySvg alt="music">
        <use
          xlinkHref={
            trackInPlayer.logo
              ? trackInPlayer.logo
              : 'img/icon/sprite.svg#icon-note'
          }
        />
      </S.TrackPlaySvg>
    </S.TrackPlayImage>
    <S.TrackPlayAuthor>
      <S.TrackPlayAuthorLink href="http://">
        {trackInPlayer.author}
      </S.TrackPlayAuthorLink>
    </S.TrackPlayAuthor>
    <S.TrackPlayAlbum>
      <S.TrackPlayAlbumLink href="http://">
        {trackInPlayer.name}
      </S.TrackPlayAlbumLink>
    </S.TrackPlayAlbum>
  </S.TrackPlayContain>
)

const Likes = () => (
  <S.TrackPlayLikesDis>
    <S.TrackPlayLikes className=" _btn-icon">
      <S.TrackPlayLikesSvg className="track-play__like-svg" alt="like">
        <use xlinkHref="img/icon/sprite.svg#icon-like" />
      </S.TrackPlayLikesSvg>
    </S.TrackPlayLikes>
    <S.TrackPlayDislikes className=" _btn-icon">
      <S.TrackPlayDislikesSvg className="track-play__dislike-svg" alt="dislike">
        <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
      </S.TrackPlayDislikesSvg>
    </S.TrackPlayDislikes>
  </S.TrackPlayLikesDis>
)

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
            xlinkHref={`img/icon/sprite.svg#icon-volume${+volume ? '' : 'non'}`}
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
