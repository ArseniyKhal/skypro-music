import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setCurrentTrack } from '../../store/actions/creators/tracksCreator'
import { playListShuffleSelector } from '../../store/selectors/tracksSelectors'
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

export const Playlist = ({ isLoading, getPlaylistError }) => {
  const playListShuffle = useSelector(playListShuffleSelector)

  const { pathname } = useLocation()
  let playlistMusic = useSelector((state) => state.audioplayer.playlist)
  const plauing = useSelector((state) => state.audioplayer.plauing)
  let title = ''

  if (pathname === '/favorites') {
    playlistMusic = playListShuffle
    title = 'Мои треки'
  } else if (pathname === '/category/1') {
    title = 'Плейлист дня'
  } else if (pathname === '/category/2') {
    title = '100 танцевальных хитов'
  } else if (pathname === '/category/3') {
    title = 'Инди-заряд'
  } else {
    title = 'Треки'
  }
  console.log(title)
  const mapTracks =
    playlistMusic.length > 0 ? (
      playlistMusic.map((track) => (
        <Track
          album={track.album}
          author={track.author}
          genre={track.genre}
          key={track.id}
          id={track.id}
          logo={track.logo ? track.logo : 'img/icon/sprite.svg#icon-note'}
          name={track.name}
          trackTime={formatTime(track.duration_in_seconds)}
          year={track.release_date}
          trackFile={track.track_file}
          isLoading={isLoading}
          // trackTitleSpan не используется в API, а в разметке есть
          trackTitleSpan={track.soName}
          plauing={plauing}
        />
      ))
    ) : (
      <h3>В этом плейлисте нет треков</h3>
    )

  return (
    <S.CenterblockContent>
      <PlaylistTitle />
      {getPlaylistError && <p>{getPlaylistError}</p>}
      <S.ContentPlaylist>
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Track
                key={item}
                album={<div className="skeleton" style={{ height: '19px' }} />}
                author={<div className="skeleton" style={{ height: '19px' }} />}
                name={<div className="skeleton" style={{ height: '19px' }} />}
                trackTime={
                  <div className="skeleton" style={{ height: '19px' }} />
                }
              />
            ))
          : mapTracks}
      </S.ContentPlaylist>
    </S.CenterblockContent>
  )
}

const PlaylistTitle = () => (
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
)

const Track = ({
  logo,
  name,
  author,
  album,
  trackTime,
  trackTitleSpan,
  isLoading,
  id,
  plauing,
}) => {
  // логика отображения фиолетового шара на обложке при восроизведении
  const trackInPleer = useSelector((state) => state.audioplayer.track)
  let visibolbubbleOut = false
  if (trackInPleer) {
    if (trackInPleer.id === id) {
      visibolbubbleOut = true
    }
  }

  const dispatch = useDispatch()
  return (
    <S.Track onClick={() => dispatch(setCurrentTrack({ id }))}>
      <S.PlaylistTrack>
        <S.TrackTitle>
          <S.TrackTitleImage>
            <S.TrackTitleSvg alt="music">
              <use xlinkHref={logo} />
            </S.TrackTitleSvg>
            {visibolbubbleOut && (
              <S.bubbleOut
                style={{
                  animationDuration: `${plauing ? '0.8s' : '0s'}`,
                }}
              />
            )}
            {isLoading && <div className="skeleton" />}
          </S.TrackTitleImage>
          <S.TrackTitleText>
            {isLoading && <div className="skeleton" />}
            <S.TrackTitleLink href="http://">
              {name}
              <S.TrackTimeSpan>{trackTitleSpan}</S.TrackTimeSpan>
            </S.TrackTitleLink>
          </S.TrackTitleText>
        </S.TrackTitle>
        <S.TrackAuthor>
          <S.TrackAuthorLink href="http://">{author}</S.TrackAuthorLink>
          {isLoading && <div className="skeleton" />}
        </S.TrackAuthor>
        <S.TrackAlbum>
          <S.TrackAlbumLink href="http://">{album}</S.TrackAlbumLink>
          {isLoading && <div className="skeleton" />}
        </S.TrackAlbum>
        <S.TrackTime>
          <S.TrackTimeSvg alt="time">
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </S.TrackTimeSvg>
          <S.TrackTimeText>{trackTime}</S.TrackTimeText>
          {isLoading && <div className="skeleton" />}
        </S.TrackTime>
      </S.PlaylistTrack>
    </S.Track>
  )
}
