import { useState, useRef } from 'react'
import * as S from './BarPlayer.styles'

export const BarPlayer = ({
  trackInPlayer,
  isPlaying,
  togglePlay,
  handlePrev,
  volumeSound,
  setProgress,
}) => {
  const clickRef = useRef()

  const checkWidth = (e) => {
    const width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    const divProgress = (offset / width) * 100
    setProgress((divProgress / 100) * trackInPlayer.length)
  }

  return (
    <S.Bar>
      <S.BarContent>
        <S.BarPlayerProgress onClick={checkWidth} ref={clickRef}>
          <S.BarPlayerProgressInside
            style={{ width: `${`${trackInPlayer.progress}%`}` }}
          />
        </S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerButtons
              trackInPlayer={trackInPlayer}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              handlePrev={handlePrev}
            />
            <S.BarPlayerTrackPlay>
              <TrackPlay trackInPlayer={trackInPlayer} />
              <Likes />
            </S.BarPlayerTrackPlay>
          </S.BarPlayer>
          <S.BarVolumeBlock>
            <VolumeSlider volumeSound={volumeSound} />
          </S.BarVolumeBlock>
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  )
}

const PlayerButtons = ({ isPlaying, togglePlay, handlePrev }) => {
  const prevBtnRef = useRef(null)
  //   prevBtnRef.onClick={(console.log('ДА!'))}
  return (
    <S.PlayerControls>
      <S.PlayerBtnPrev ref={prevBtnRef}>
        <S.PlayerBtnPrevSvg onClick={handlePrev} alt="prev">
          <use xlinkHref="img/icon/sprite.svg#icon-prev" />
        </S.PlayerBtnPrevSvg>
      </S.PlayerBtnPrev>
      <S.PlayerBtnPlay onClick={togglePlay}>
        <S.PlayerBtnPlaySvg alt="play">
          <use
            xlinkHref={`img/icon/sprite.svg#icon-${
              isPlaying ? 'pause' : 'play'
            }`}
          />
        </S.PlayerBtnPlaySvg>
      </S.PlayerBtnPlay>
      <S.PlayerBtnNext>
        <S.PlayerBtnNextSvg alt="next">
          <use xlinkHref="img/icon/sprite.svg#icon-next" />
        </S.PlayerBtnNextSvg>
      </S.PlayerBtnNext>
      <S.PlayerBtnRepeat className=" _btn-icon">
        <S.PlayerBtnRepeatSvg alt="repeat">
          <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
        </S.PlayerBtnRepeatSvg>
      </S.PlayerBtnRepeat>
      <S.PlayerBtnShuffle className=" _btn-icon">
        <S.PlayerBtnShuffleSvg alt="shuffle">
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
        <use xlinkHref={trackInPlayer.logo} />
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

const VolumeSlider = ({ volumeSound }) => {
  // громкость
  const [isVolumeSound, setIsVolumeSound] = useState(null)
  const [tempVolume, setTempVolume] = useState(null)
  const setVolume = (volume) => {
    setIsVolumeSound(volume / 100)
    volumeSound(isVolumeSound)
  }

  const toggleVolume = () => {
    if (isVolumeSound) {
      setTempVolume(isVolumeSound)
      setIsVolumeSound(0)
      volumeSound(0)
    } else {
      setIsVolumeSound(tempVolume)
      volumeSound(tempVolume)
    }
  }

  return (
    <S.VolumeContent>
      <S.VolumeImage onClick={toggleVolume}>
        <S.VolumeSvg alt="volume">
          <use
            xlinkHref={`img/icon/sprite.svg#icon-volume${
              isVolumeSound ? '' : 'non'
            }`}
          />
        </S.VolumeSvg>
      </S.VolumeImage>
      <S.VolumeProgress className=" _btn">
        <S.VolumeProgressLine
          className=" _btn"
          type="range"
          name="range"
          onChange={(e) => {
            setVolume(e.target.value)
          }}
        />
      </S.VolumeProgress>
    </S.VolumeContent>
  )
}
