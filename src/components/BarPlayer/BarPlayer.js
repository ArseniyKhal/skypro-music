import * as S from './BarPlayer.styles'

export default function Bar({ isLoading }) {
  return (
    <S.Bar>
      <S.BarContent>
        <S.BarPlayerProgress />
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerButtons />
            <S.BarPlayerTrackPlay>
              <TrackPlay isLoading={isLoading} />
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
}

function PlayerButtons() {
  return (
    <S.PlayerControls>
      <S.PlayerBtnPrev>
        <S.PlayerBtnPrevSvg alt="prev">
          <use xlinkHref="img/icon/sprite.svg#icon-prev" />
        </S.PlayerBtnPrevSvg>
      </S.PlayerBtnPrev>
      <S.PlayerBtnPlay>
        <S.PlayerBtnPlaySvg alt="play">
          <use xlinkHref="img/icon/sprite.svg#icon-play" />
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

function TrackPlay({ isLoading }) {
  return (
    <S.TrackPlayContain>
      <S.TrackPlayImage>
        <S.TrackPlaySvg alt="music">
          <use xlinkHref="img/icon/sprite.svg#icon-note" />
        </S.TrackPlaySvg>
        {isLoading && <div className="skeleton" />}
      </S.TrackPlayImage>
      <S.TrackPlayAuthor>
        <S.TrackPlayAuthorLink href="http://">Ты та...</S.TrackPlayAuthorLink>
        {isLoading && <div className="skeleton" />}
      </S.TrackPlayAuthor>
      <S.TrackPlayAlbum>
        <S.TrackPlayAlbumLink href="http://">Баста</S.TrackPlayAlbumLink>
        {isLoading && <div className="skeleton" />}
      </S.TrackPlayAlbum>
    </S.TrackPlayContain>
  )
}

function Likes() {
  return (
    <S.TrackPlayLikesDis>
      <S.TrackPlayLikes className="track-play__like _btn-icon">
        <S.TrackPlayLikesSvg alt="like">
          <use xlinkHref="img/icon/sprite.svg#icon-like" />
        </S.TrackPlayLikesSvg>
      </S.TrackPlayLikes>
      <S.TrackPlayDislikes className=" _btn-icon">
        <S.TrackPlayDislikesSvg alt="dislike">
          <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
        </S.TrackPlayDislikesSvg>
      </S.TrackPlayDislikes>
    </S.TrackPlayLikesDis>
  )
}

function VolumeSlider() {
  return (
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
}
