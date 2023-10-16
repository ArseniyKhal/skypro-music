import { useSelector, useDispatch } from 'react-redux'
import {
  setCurrentTrack,
  addPlaylist,
} from '../../store/actions/creators/audioplayerCreator'
import {
  useLikeTrackMutation,
  useDislikeTrackMutation,
} from '../../services/servicesApi'
import { idUserSelector } from '../../store/selectors/authSelectors'
import { isPlauingSelector } from '../../store/selectors/audioplayerSelectors'
import * as S from './Playlist.styles'

// форматер времени трека
export const formatTime = (t) => {
  const time = Math.round(t)
  let hour = Math.floor(time / 3600)
  let min = Math.floor((time - hour * 3600) / 60)
  let sec = time - hour * 3600 - min * 60
  if (sec < 10) {
    sec = `0${sec}`
  }
  if (min < 10) {
    min = `0${min}`
  }
  if (hour === 0) {
    hour = ''
  } else {
    hour = `${hour}:`
  }
  return `${hour}${min}:${sec}`
}
// PLAYLIST
export const Playlist = ({
  tracks,
  isLoading,
  error,
  showAllTracksAsLiked,
}) => {
  const mapTracks =
    tracks?.length > 0 ? (
      tracks.map((track) => (
        <Track
          key={track.id}
          isLoading={isLoading}
          track={track}
          playlist={tracks}
          showAllTracksAsLiked={showAllTracksAsLiked}
        />
      ))
    ) : (
      <h3>В этом плейлисте нет треков</h3>
    )
  return (
    <S.CenterblockContent>
      <S.ContentTitle>
        <S.PlaylistTitleCol1>ТРЕК</S.PlaylistTitleCol1>
        <S.PlaylistTitleCol2>ИСПОЛНИТЕЛЬ</S.PlaylistTitleCol2>
        <S.PlaylistTitleCol3>АЛЬБОМ</S.PlaylistTitleCol3>
        <S.PlaylistTitleCol4>
          <S.PlaylistTitleSvg alt="time">
            <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
          </S.PlaylistTitleSvg>
        </S.PlaylistTitleCol4>
      </S.ContentTitle>
      {error && (
        <p>
          Не удалось загрузить плейлист, попробуйте позже. Ошибка:{' '}
          {error.message}
        </p>
      )}
      <S.ContentPlaylist>
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Track isLoading={isLoading} key={item} />
            ))
          : mapTracks}
      </S.ContentPlaylist>
    </S.CenterblockContent>
  )
}

// TRACK
const Track = ({ isLoading, track, playlist, showAllTracksAsLiked }) => {
  const idUser = useSelector(idUserSelector)
  const plauing = useSelector(isPlauingSelector)
  const dispatch = useDispatch()

  // логика отображения фиолетового шара на обложке при восроизведении
  const trackInPleer = useSelector((state) => state.audioplayer.track)
  let visibolbubbleOut = false
  if (trackInPleer) {
    if (trackInPleer.id === track?.id) {
      visibolbubbleOut = true
    }
  }

  // обработчик лайков
  const trackId = track?.id
  const [likeTrack] = useLikeTrackMutation()
  const [dislikeTrack, { error: dislikeError }] = useDislikeTrackMutation()
  let isLike = false
  if (dislikeError) {
    console.log(dislikeError.originalStatus)
  }
  isLike = (track?.stared_user ?? []).find(({ id }) => id === idUser)
  if (showAllTracksAsLiked) {
    isLike = true
  }
  const toggleLike = (e) => {
    e.stopPropagation()
    if (isLike) {
      dislikeTrack(trackId)
      isLike = false
    } else {
      likeTrack(trackId)
        .unwrap()
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
      isLike = true
    }
  }
  // клик по треку
  const toggleTrackClick = () => {
    dispatch(setCurrentTrack({ ...track, like: !!isLike }))
    dispatch(addPlaylist(playlist))
  }

  return (
    <S.Track onClick={toggleTrackClick}>
      <S.PlaylistTrack>
        <S.TrackTitle>
          <S.TrackTitleImage>
            <S.TrackTitleSvg alt="music">
              <use
                xlinkHref={
                  track?.logo ? track.logo : '/img/icon/sprite.svg#icon-note'
                }
              />
            </S.TrackTitleSvg>
            {visibolbubbleOut && (
              <S.bubbleOut
                style={{
                  animationDuration: `${plauing ? '0.8s' : '0s'}`,
                }}
              />
            )}
            {isLoading && <S.Skeleton />}
          </S.TrackTitleImage>
          <S.TrackTitleText>
            <S.TrackTitleLink href="http://">
              {isLoading ? 'Loading...' : track.name}
            </S.TrackTitleLink>
            {isLoading && <S.Skeleton />}
          </S.TrackTitleText>
        </S.TrackTitle>
        <S.TrackAuthor>
          <S.TrackAuthorLink href="http://">
            {isLoading ? 'Loading...' : track.author}
          </S.TrackAuthorLink>
          {isLoading && <S.Skeleton />}
        </S.TrackAuthor>
        <S.TrackAlbum>
          <S.TrackAlbumLink href="http://">
            {isLoading ? 'Loading...' : track.album}
          </S.TrackAlbumLink>
          {isLoading && <S.Skeleton />}
        </S.TrackAlbum>
        <S.TrackTime>
          <S.TrackTimeSvg
            alt="time"
            onClick={toggleLike}
            style={{
              stroke: `${isLike ? '#B672FF' : ''}`,
              fill: `${isLike ? '#B672FF' : ''}`,
            }}
          >
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          </S.TrackTimeSvg>
          <S.TrackTimeText>
            {formatTime(track?.duration_in_seconds)}
            {isLoading && <S.Skeleton />}
          </S.TrackTimeText>
        </S.TrackTime>
      </S.PlaylistTrack>
    </S.Track>
  )
}
