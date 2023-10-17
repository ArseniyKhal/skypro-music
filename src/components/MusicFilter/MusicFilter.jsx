import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addPlaylist } from '../../store/actions/creators/audioplayerCreator'
import { useGetTracksQuery } from '../../services/servicesApi'
import * as S from './Filter.styles'

export const MusicFilter = () => {
  // отображение/скрытие меню фильтра
  const [visibleFilter, setVisibleFilter] = useState(null)
  const toggleVisibleFilter = (filter) => {
    setVisibleFilter(visibleFilter === filter ? null : filter)
  }
  const { data: playlistMusic, isLoading } = useGetTracksQuery()
  return (
    <S.CenterblockFilter>
      <S.FilterSearc>
        <S.FilterTitle>Искать по:</S.FilterTitle>
        <MusicFilterItem
          title="исполнителю"
          filterList={Array.from(
            new Set(playlistMusic?.map((track) => track.author)),
          )}
          isLoading={isLoading}
          visibleFilter={visibleFilter}
          toggleVisibleFilter={toggleVisibleFilter}
          playlistMusic={playlistMusic}
        />
        <MusicFilterItem
          title="жанру"
          filterList={Array.from(
            new Set(playlistMusic?.map((track) => track.genre)),
          )}
          isLoading={isLoading}
          visibleFilter={visibleFilter}
          toggleVisibleFilter={toggleVisibleFilter}
          playlistMusic={playlistMusic}
        />
      </S.FilterSearc>
      <S.FilterSort>
        <S.FilterTitle>Сортировка:</S.FilterTitle>
        <MusicFilterItem
          title="году выпуска"
          filterList={Array.from(
            new Set(playlistMusic?.map((track) => track.release_date)),
          )}
          isLoading={isLoading}
          visibleFilter={visibleFilter}
          toggleVisibleFilter={toggleVisibleFilter}
          playlistMusic={playlistMusic}
        />
      </S.FilterSort>
    </S.CenterblockFilter>
  )
}

const MusicFilterItem = ({
  title,
  filterList,
  isLoading,
  visibleFilter,
  toggleVisibleFilter,
  playlistMusic,
}) => {
  // массив критерия поиска фильтра
  const [selectedFilter, setSelectedFilter] = useState([])
  const dispatch = useDispatch()

  let filterPlayList = []
  // выбираем критерый фильтрации
  const toggleFilter = (track) => {
    if (selectedFilter?.includes(track)) {
      setSelectedFilter(selectedFilter.filter((e) => e !== track))
    } else {
      setSelectedFilter([...selectedFilter, track])
    }
  }

  useEffect(() => {
    for (let i = 0; i < selectedFilter.length; i++) {
      const a = playlistMusic.filter((el) => el.author === selectedFilter[i])
      filterPlayList = [...filterPlayList, ...a]
    }
    dispatch(addPlaylist(filterPlayList))
  }, [selectedFilter])

  return (
    <S.FilterItem
      disabled={{ isLoading }}
      style={{ pointerEvents: isLoading && 'none' }}
    >
      <S.FilterButton
        onClick={() => toggleVisibleFilter(title)}
        className=" _btn-text"
        style={{
          borderColor: selectedFilter?.length ? '#9A48F1' : '',
          color: selectedFilter?.length ? '#9A48F1' : '',
        }}
      >
        {title}
      </S.FilterButton>
      {selectedFilter?.length > 0 && (
        <S.FilterLabel>{selectedFilter.length}</S.FilterLabel>
      )}

      {visibleFilter === title && (
        <S.FilterMenu>
          <S.FilterContent>
            <S.FilterList>
              {filterList.map((track) => (
                <S.FilterText
                  key={track}
                  style={{
                    color: selectedFilter?.includes(track) ? '#b672ff' : '',
                    fontWeight: selectedFilter?.includes(track) ? '600' : '',
                  }}
                  onClick={() => toggleFilter(track)}
                >
                  {track}
                </S.FilterText>
              ))}
            </S.FilterList>
          </S.FilterContent>
        </S.FilterMenu>
      )}
    </S.FilterItem>
  )
}
