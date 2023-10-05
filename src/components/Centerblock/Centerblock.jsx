import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { isLoadingSelector } from '../../store/selectors/tracksSelectors'
import * as S from './Centerblock.styles'

export const Centerblock = () => {
  const { pathname } = useLocation()
  let title = ''
  if (pathname === '/favorites') {
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

  return (
    <S.MainCenterblock>
      <Search />
      <S.CenterblockH2>{title}</S.CenterblockH2>
      <MusicFilter />

      <Outlet />

      {/* <Playlist
        isLoading={isLoading} ??????????????
        getPlaylistError={getPlaylistError} ??????????????
      /> */}
    </S.MainCenterblock>
  )
}

const Search = () => (
  <S.CenterblockSearch>
    <S.SearchSvg>
      <use xlinkHref="img/icon/sprite.svg#icon-search" />
    </S.SearchSvg>
    <S.SearchText type="search" placeholder="Поиск" name="search" />
  </S.CenterblockSearch>
)

const MusicFilter = () => {
  const [visibleFilter, setvisibleFilter] = useState(null)
  const playlistMusic = useSelector((state) => state.audioplayer.playlist)
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
      />
      <MusicFilterItem
        title="году выпуска"
        filterList={Array.from(
          new Set(playlistMusic.map((track) => track.release_date)),
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

const MusicFilterItem = ({
  toggleVisibleFilter,
  title,
  visibleFilter,
  filterList,
}) => {
  const isLoading = useSelector(isLoadingSelector)
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
