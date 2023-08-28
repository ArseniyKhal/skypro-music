import { useState } from 'react'
import * as S from './Centerblock.styles'
import playlistMusic from '../../data'

export default function Centerblock({ isLoading }) {
  return (
    <S.MainCenterblock>
      <Search />
      <S.CenterblockH2>Треки</S.CenterblockH2>
      <MusicFilter isLoading={isLoading} />
      <Playlist isLoading={isLoading} playlistMusic={playlistMusic} />
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

function MusicFilter({ isLoading }) {
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
          new Set(playlistMusic.map((track) => track.trackAuthor)),
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
      />
      <MusicFilterItem
        title="жанру"
        filterList={Array.from(
          new Set(playlistMusic.map((track) => track.genre)),
        )}
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
      />
    </S.CenterblockFilter>
  )
}

function MusicFilterItem({
  toggleVisibleFilter,
  title,
  visibleFilter,
  filterList,
}) {
  return (
    <S.FilterItem
      onClick={() => toggleVisibleFilter(title)}
      // Как отключить кнопку!?!?
      disabled
      aria-hidden="true"
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

function Playlist({ isLoading }) {
  return (
    <S.CenterblockContent>
      <PlaylistTitle />
      <S.ContentPlaylist>
        {playlistMusic.map((track) => (
          <PlaylistItem
            key={track.id}
            playlistMusic={playlistMusic}
            trackImgUrl={track.trackImgUrl}
            trackTitle={track.trackTitle}
            trackTitleSpan={track.trackTitleSpan}
            trackAuthor={track.trackAuthor}
            album={track.album}
            trackTime={track.trackTime}
            year={track.year}
            genre={track.genre}
            isLoading={isLoading}
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
  trackImgUrl,
  trackTitle,
  trackAuthor,
  album,
  trackTime,
  trackTitleSpan,
  isLoading,
}) {
  return (
    <S.PlaylistItem>
      <S.PlaylistTrack>
        <S.TrackTitle>
          <S.TrackTitleImage>
            <S.TrackTitleSvg alt="music">
              <use xlinkHref={trackImgUrl} />
            </S.TrackTitleSvg>
            {isLoading && <div className="skeleton" />}
          </S.TrackTitleImage>
          <S.TrackTitleText>
            {isLoading && <div className="skeleton" />}
            <S.TrackTitleLink href="http://">
              {trackTitle}
              <S.TrackTimeSpan>{trackTitleSpan}</S.TrackTimeSpan>
            </S.TrackTitleLink>
          </S.TrackTitleText>
        </S.TrackTitle>
        <S.TrackAuthor>
          <S.TrackAuthorLink href="http://">{trackAuthor}</S.TrackAuthorLink>
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
