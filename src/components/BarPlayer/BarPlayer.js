import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatTime } from '../Centerblock/Centerblock'
import { currentTrack } from '../../store/selectors/tracksSelectors'
import * as S from './BarPlayer.styles'

export const BarPlayer = ({
  isPlaying,
  togglePlay,
  handlePrev,
  handleNext,
  toggleLoop,
  volume,
  volumeChange,
  setProgress,
  isLoop,
  toggleShuffle,
  isShuffle,
  audioElem,
  duration,
}) => {
  const track = useSelector(currentTrack)

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
        {formatTime(audioElem.current.currentTime)} /
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
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              handlePrev={handlePrev}
              handleNext={handleNext}
              toggleLoop={toggleLoop}
              isLoop={isLoop}
              toggleShuffle={toggleShuffle}
              isShuffle={isShuffle}
            />
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

const PlayerButtons = ({
  isPlaying,
  togglePlay,
  handlePrev,
  handleNext,
  toggleLoop,
  isLoop,
  toggleShuffle,
  isShuffle,
}) => (
  <S.PlayerControls>
    <S.PlayerBtnPrev onClick={handlePrev}>
      <S.PlayerBtnPrevSvg alt="prev">
        <use xlinkHref="img/icon/sprite.svg#icon-prev" />
      </S.PlayerBtnPrevSvg>
    </S.PlayerBtnPrev>
    <S.PlayerBtnPlay onClick={togglePlay}>
      <S.PlayerBtnPlaySvg alt="play">
        <use
          xlinkHref={`img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}
        />
      </S.PlayerBtnPlaySvg>
    </S.PlayerBtnPlay>
    <S.PlayerBtnNext onClick={handleNext}>
      <S.PlayerBtnNextSvg alt="next">
        <use xlinkHref="img/icon/sprite.svg#icon-next" />
      </S.PlayerBtnNextSvg>
    </S.PlayerBtnNext>
    <S.PlayerBtnRepeat onClick={toggleLoop} className=" _btn-icon">
      <S.PlayerBtnRepeatSvg
        style={{ stroke: `${isLoop ? '#ACACAC' : '#696969'}` }}
        alt="repeat"
      >
        <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
      </S.PlayerBtnRepeatSvg>
    </S.PlayerBtnRepeat>
    <S.PlayerBtnShuffle onClick={toggleShuffle} className=" _btn-icon">
      <S.PlayerBtnShuffleSvg
        style={{ stroke: `${isShuffle ? '#ACACAC' : '#696969'}` }}
        alt="shuffle"
      >
        <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
      </S.PlayerBtnShuffleSvg>
    </S.PlayerBtnShuffle>
  </S.PlayerControls>
)

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
