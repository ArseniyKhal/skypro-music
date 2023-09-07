import { useState } from 'react'
// import {  useEffect } from 'react'
import * as S from './Centerblock.styles'
// import { getPlaylist } from '../../api'

// форматер времени трека
export function formatTime(time) {
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

export function Centerblock({ isLoading, openPlayer, playlistMusic }) {
  return (
    <S.MainCenterblock>
      <Search />
      <S.CenterblockH2>Треки</S.CenterblockH2>
      <MusicFilter isLoading={isLoading} playlistMusic={playlistMusic} />
      <Playlist
        isLoading={isLoading}
        playlistMusic={playlistMusic}
        openPlayer={openPlayer}
      />
    </S.MainCenterblock>
  )
}

function Search() {
  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="img/icon/sprite.svg#icon-search" />
      </S.SearchSvg>
      <S.SearchText type="search" placeholder="Поиск" name="search" />
    </S.CenterblockSearch>
  )
}

function MusicFilter({ isLoading, playlistMusic }) {
  const [visibleFilter, setvisibleFilter] = useState(null)
  const toggleVisibleFilter = (filter) => {
    setvisibleFilter(visibleFilter === filter ? null : filter)
  }
  return (
    <S.CenterblockFilter>
      <S.FilterTitle>Искать по:</S.FilterTitle>
      <MusicFilterItem
        title="исполнителю"
        filterList={Array.from(
          new Set(playlistMusic.map((track) => track.author)),
        )}
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
        isLoading={isLoading}
      />
      <MusicFilterItem
        title="году выпуска"
        filterList={Array.from(
          new Set(playlistMusic.map((track) => track.year)),
        )}
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
        isLoading={isLoading}
      />
      <MusicFilterItem
        title="жанру"
        filterList={Array.from(
          new Set(playlistMusic.map((track) => track.genre)),
        )}
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
        isLoading={isLoading}
      />
    </S.CenterblockFilter>
  )
}

function MusicFilterItem({
  toggleVisibleFilter,
  title,
  visibleFilter,
  filterList,
  isLoading,
}) {
  return (
    <S.FilterItem
      onClick={() => toggleVisibleFilter(title)}
      disabled={{ isLoading }}
      style={{ pointerEvents: isLoading && 'none' }}
    >
      <S.FilterButton className=" _btn-text">{title}</S.FilterButton>
      {visibleFilter === title && (
        <S.FilterMenu>
          <S.FilterContent>
            <S.FilterList>
              {filterList.map((track) => (
                <S.FilterText key={track}>{track}</S.FilterText>
              ))}
            </S.FilterList>
          </S.FilterContent>
        </S.FilterMenu>
      )}
    </S.FilterItem>
  )
}

function Playlist({ isLoading, openPlayer, playlistMusic }) {
  // загрузка списка треков
  //   const [tracks, setTracks] = useState([])
  //   useEffect(() => {
  //     getPlaylist().then((tracks2) => {
  //       setTracks(tracks2)
  //     })
  //   }, [])

  return (
    <S.CenterblockContent>
      <PlaylistTitle />
      <S.ContentPlaylist>
        {playlistMusic.map((track) => (
          <PlaylistItem
            album={track.album}
            author={track.author}
            genre={track.genre}
            key={track.id}
            logo={track.logo}
            name={track.name}
            trackTime={formatTime(track.duration_in_seconds)}
            year={track.release_date}
            trackFile={track.track_file}
            isLoading={isLoading}
            playlistMusic={playlistMusic}
            // trackTitleSpan не используется
            trackTitleSpan={track.soName}
            openPlayer={openPlayer}
          />
        ))}
      </S.ContentPlaylist>
    </S.CenterblockContent>
  )
}

function PlaylistTitle() {
  return (
    <S.ContentTitle>
      <S.PlaylistTitleCol1>Трек</S.PlaylistTitleCol1>
      <S.PlaylistTitleCol2>ИСПОЛНИТЕЛЬ</S.PlaylistTitleCol2>
      <S.PlaylistTitleCol3>АЛЬБОМ</S.PlaylistTitleCol3>
      <S.PlaylistTitleCol4>
        <S.PlaylistTitleSvg alt="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch" />
        </S.PlaylistTitleSvg>
      </S.PlaylistTitleCol4>
    </S.ContentTitle>
  )
}

function PlaylistItem({
  logo,
  name,
  author,
  album,
  trackTime,
  trackTitleSpan,
  isLoading,
  openPlayer,
  trackFile,
}) {
  return (
    <S.PlaylistItem
      onClick={() => openPlayer({ name, author, logo, trackFile })}
    >
      <S.PlaylistTrack>
        <S.TrackTitle>
          <S.TrackTitleImage>
            <S.TrackTitleSvg alt="music">
              <use xlinkHref={logo} />
            </S.TrackTitleSvg>
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
    </S.PlaylistItem>
  )
}
