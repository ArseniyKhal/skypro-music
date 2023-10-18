import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPlaylist } from '../../store/actions/creators/audioplayerCreator'
import { useGetTracksQuery } from '../../services/servicesApi'
import * as S from './Filter.styles'
import { playListSelector } from '../../store/selectors/audioplayerSelectors'

export const MusicFilter = () => {
  // отображение/скрытие меню фильтра
  const [visibleFilter, setVisibleFilter] = useState(null)
  const playlistMusic = useSelector(playListSelector)
  const toggleVisibleFilter = (filter) => {
    setVisibleFilter(visibleFilter === filter ? null : filter)
  }
  const { data: playlistAPI, isLoading } = useGetTracksQuery()
  //   const [selectedFilter, setSelectedFilter] = useState([])
  return (
    <S.CenterblockFilter>
      <S.FilterSearc>
        <S.FilterTitle>Искать по:</S.FilterTitle>
        <MusicFilterItem
          title="исполнителю"
          filterList={Array.from(
            new Set(playlistAPI?.map((track) => track.author)),
          )}
          isLoading={isLoading}
          visibleFilter={visibleFilter}
          toggleVisibleFilter={toggleVisibleFilter}
          playlistMusic={playlistAPI}
          //  selectedFilter={selectedFilter}
          //  setSelectedFilter={setSelectedFilter}
        />
        <MusicFilterItem
          title="жанру"
          filterList={Array.from(
            new Set(playlistAPI?.map((track) => track.genre)),
          )}
          isLoading={isLoading}
          visibleFilter={visibleFilter}
          toggleVisibleFilter={toggleVisibleFilter}
          playlistMusic={playlistAPI}
          //  selectedFilter={selectedFilter}
          //  setSelectedFilter={setSelectedFilter}
        />
      </S.FilterSearc>
      <S.FilterSort>
        <S.FilterTitle>Сортировка:</S.FilterTitle>
        <MusicFilterItem
          title="году выпуска"
          filterList={['По умолчанию', 'Сначала новые', 'Сначала старые']}
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
  //   selectedFilter,
  //   setSelectedFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState([])
  const dispatch = useDispatch()

  //   // выбираем тип фильтра
  //   let type = ''
  //   if (title === 'исполнителю') {
  //     type = 'author'
  //   } else if (title === 'жанру') {
  //     type = 'genre'
  //   } else {
  //     type = 'release_date'
  //     console.log(type)
  //   }

  // массив критерия поиска фильтра

  let filterPlayList = []
  //   // выбираем критерый фильтрации
  const toggleFilter = (track) => {
    if (selectedFilter?.includes(track)) {
      setSelectedFilter(selectedFilter.filter((e) => e !== track))
    } else {
      setSelectedFilter([...selectedFilter, track])
    }
  }

  useEffect(() => {
    for (let i = 0; i < selectedFilter?.length; i++) {
      const author = playlistMusic.filter(
        (el) => el.author === selectedFilter[i],
      )
      const genre = playlistMusic.filter((el) => el.genre === selectedFilter[i])
      filterPlayList = [...filterPlayList, ...author, ...genre]
    }
    dispatch(
      addPlaylist(
        selectedFilter?.length === 0 ? playlistMusic : filterPlayList,
      ),
    )
  }, [selectedFilter])

  return (
    <S.FilterItem
      disabled={{ isLoading }}
      style={{ pointerEvents: isLoading && 'none' }}
    >
      <S.FilterButton
        onClick={() => toggleVisibleFilter(title)}
        className="_btn-text"
        style={{
          borderColor: selectedFilter?.length ? '#9A48F1' : '',
          color: selectedFilter?.length ? '#9A48F1' : '',
        }}
      >
        {title === 'году выпуска' ? filterList[0] : title}
      </S.FilterButton>
      {selectedFilter?.length > 0 && (
        <S.FilterLabel>{selectedFilter.length}</S.FilterLabel>
      )}

      {visibleFilter === title && (
        <S.FilterMenu
          style={{
            right: title === 'году выпуска' ? '0px' : '',
            left: title === 'году выпуска' ? 'auto' : '',
          }}
        >
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
