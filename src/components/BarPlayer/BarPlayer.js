// import { useState, useRef } from 'react'
import * as S from './BarPlayer.styles'

export const BarPlayer = ({ trackInPlayer, isPlaying, togglePlay }) => (
  <S.Bar>
    <S.BarContent>
      <S.BarPlayerProgress />
      <S.BarPlayerBlock>
        <S.BarPlayer>
          <PlayerButtons
            trackInPlayer={trackInPlayer}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
          />
          <S.BarPlayerTrackPlay>
            <TrackPlay trackInPlayer={trackInPlayer} />
            <Likes />
          </S.BarPlayerTrackPlay>
        </S.BarPlayer>
        <S.BarVolumeBlock>
          <VolumeSlider />
        </S.BarVolumeBlock>
      </S.BarPlayerBlock>
    </S.BarContent>
  </S.Bar>
)

const PlayerButtons = ({ isPlaying, togglePlay }) => (
  <S.PlayerControls>
    <S.PlayerBtnPrev>
      <S.PlayerBtnPrevSvg
        alt="prev"
        onClick={() => alert('еще не реализовано')}
      >
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

const VolumeSlider = () => (
  <S.VolumeContent>
    <S.VolumeImage>
      <S.VolumeSvg alt="volume">
        <use xlinkHref="img/icon/sprite.svg#icon-volume" />
      </S.VolumeSvg>
    </S.VolumeImage>
    <S.VolumeProgress className=" _btn">
      <S.VolumeProgressLine className=" _btn" type="range" name="range" />
    </S.VolumeProgress>
  </S.VolumeContent>
)
