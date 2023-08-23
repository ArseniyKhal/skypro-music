import { useState } from 'react'
import * as S from './Centerblock.styles'

export const playlistMusic = [
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Guilt',
    trackTitleSpan: '',
    trackAuthor: 'Nero',
    album: 'Welcome Reality',
    trackTime: '4:44',
    year: '1980',
    genre: 'rock',
    id: 'fghtfgkhmjrtlkhnfgb',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Elektro',
    trackTitleSpan: '',
    trackAuthor: 'Dynoro, Outwork, Mr. Gee',
    album: 'Elektro',
    trackTime: '2:22',
    year: '2020',
    genre: 'rock',
    id: '45645fdgklerjt54j',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'I’m Fire',
    trackTitleSpan: '',
    trackAuthor: 'Ali Bakgor',
    album: 'I’m Fire',
    trackTime: '2:22',
    year: '2001',
    genre: 'rock',
    id: '567ynfght7un7tuj',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Non Stop',
    trackTitleSpan: '(Remix)',
    trackAuthor: 'Стоункат, Psychopath',
    album: 'Non Stop',
    trackTime: '4:12',
    year: '2001',
    genre: 'rock',
    id: 'e5t7e57nrthbfuytu',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Run Run',
    trackTitleSpan: '(feat. AR/CO)',
    trackAuthor: 'Jaded, Will Clarke, AR/CO',
    album: 'Run Run',
    trackTime: '2:54',
    year: '1980',
    genre: 'electronic',
    id: 'tyu67nrtbyrdyr6yb',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Eyes on Fire',
    trackTitleSpan: '(Zeds Dead Remix)',
    trackAuthor: 'Blue Foundation, Zeds Dead',
    album: 'Eyes on Fire',
    trackTime: '5:20',
    year: '2009',
    genre: 'hip-hop',
    id: 'nrty65756rtbdyrby656by',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Mucho Bien',
    trackTitleSpan: '(Hi Profile Remix)',
    trackAuthor: 'HYBIT, Mr. Black, Offer Nissim, Hi Profile',
    album: 'Mucho Bien',
    trackTime: '3:41',
    year: '2007',
    genre: 'rock',
    id: 'brst5r645br5yrdtngku',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Knives n Cherries',
    trackTitleSpan: '',
    trackAuthor: 'minthaze',
    album: 'Captivating',
    trackTime: '1:48',
    year: '2009',
    genre: 'pop',
    id: 'fsrtyrby65nyntunth',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'How Deep Is Your Love',
    trackTitleSpan: '',
    trackAuthor: 'Calvin Harris, Disciples',
    album: 'How Deep Is Your Love',
    trackTime: '3:32',
    year: '2012',
    genre: 'electronic',
    id: 'dfnfynut7mudtunt6d6by6yj',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Morena',
    trackTitleSpan: '',
    trackAuthor: 'Tom Boxer',
    album: 'Soundz Made in Romania',
    trackTime: '3:36',
    year: '1999',
    genre: 'pop',
    id: 'rtbhr6e765ntdrtbnfyuny',
  },
]

export default function Centerblock({ isLoading }) {
  return (
    <S.MainCenterblock>
      <Search />
      <S.CenterblockH2>Треки</S.CenterblockH2>
      <MusicFilter />
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

function MusicFilter() {
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
    <S.FilterItem onClick={() => toggleVisibleFilter(title)} aria-hidden="true">
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
