import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setCurrentTrack } from '../../store/actions/creators/audioplayerCreator'
import {
  useGetFavoriteTracksQuery,
  useLikeTrackMutation,
  //   useDislikeTrackMutation,
} from '../../services/servicesApi'
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
export const Playlist = ({ tracks, isLoading, getPlaylistError }) => {
  const tracksFavoriteData = useGetFavoriteTracksQuery().data

  const mapTracks =
    tracks?.length > 0 ? (
      tracks.map((track) => (
        <Track key={track.id} isLoading={isLoading} track={track} />
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
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </S.PlaylistTitleSvg>
        </S.PlaylistTitleCol4>
      </S.ContentTitle>
      {getPlaylistError && <p>{getPlaylistError}</p>}
      <S.ContentPlaylist>
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Track
                isLoading={isLoading}
                key={item}
                favList={tracksFavoriteData}
              />
            ))
          : mapTracks}
      </S.ContentPlaylist>
    </S.CenterblockContent>
  )
}

// TRACK
const Track = ({ isLoading, track }) => {
  const plauing = useSelector(isPlauingSelector)
  const dispatch = useDispatch()

  // логика отображения фиолетового шара на обложке при восроизведении
  const trackInPleer = useSelector((state) => state.audioplayer.track)
  let visibolbubbleOut = false
  if (trackInPleer) {
    if (trackInPleer.id === track.id) {
      visibolbubbleOut = true
    }
  }

  // обработчик лайков
  const trackId = track?.id
  const [like, setLike] = useState(false)
  const [addFavoriteTrack, { isSuccess }] = useLikeTrackMutation()
  //   const [dalFavoriteTrack] = useDelFavoriteTrackMutation()
  const toggleLike = async (e) => {
    e.stopPropagation()
    setLike(!like)
    await addFavoriteTrack(trackId).unwrap()
    //  await dalFavoriteTrack(trackId).unwrap()
    console.log('isSuccess:', isSuccess)
  }

  return (
    <S.Track onClick={() => dispatch(setCurrentTrack(track))}>
      <S.PlaylistTrack>
        <S.TrackTitle>
          <S.TrackTitleImage>
            <S.TrackTitleSvg alt="music">
              <use
                xlinkHref={
                  track?.logo ? track.logo : 'img/icon/sprite.svg#icon-note'
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
              stroke: `${like ? '#B672FF' : ''}`,
              fill: `${like ? '#B672FF' : ''}`,
            }}
          >
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
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
