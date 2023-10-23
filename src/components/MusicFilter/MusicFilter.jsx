import { useState, useEffect } from 'react'
import { useGetTracksQuery } from '../../services/servicesApi'
import * as S from './Filter.styles'

export const MusicFilter = ({ setMusic }) => {
  // отображение/скрытие меню фильтра
  const [visibleFilter, setVisibleFilter] = useState(null)
  const toggleVisibleFilter = (filter) => {
    setVisibleFilter(visibleFilter === filter ? null : filter)
  }
  const { data: playlistAPI, isLoading } = useGetTracksQuery()
  const [authorFilter, setAuthorFilter] = useState([])
  const [genreFilter, setGenreFilter] = useState([])
  const [selectedSort, setSelectedSort] = useState('По умолчанию')

  useEffect(() => {
    if (
      !authorFilter.length &&
      !genreFilter.length &&
      selectedSort === 'По умолчанию'
    ) {
      setMusic(playlistAPI)
    } else {
      // ======================= ФИЛЬТР ПО АВТОРУ ==========================
      let authorList = []
      if (authorFilter.length) {
        for (let i = 0; i < authorFilter.length; i++) {
          const result = playlistAPI.filter(
            (el) => el.author === authorFilter[i],
          )
          authorList = [...authorList, ...result]
        }
      } else {
        authorList = playlistAPI
      }

      // ======================= ФИЛЬТР ПО ЖАНРУ ==========================
      let genreList = []
      if (genreFilter.length) {
        for (let i = 0; i < genreFilter.length; i++) {
          const result = authorList.filter((el) => el.genre === genreFilter[i])
          genreList = [...genreList, ...result]
        }
      } else {
        genreList = authorList
      }

      // ======================= СОРТИРОВКА ПО ДАТЕ ============================
      let sortList = []
      if (selectedSort !== 'По умолчанию') {
        // проверка на нулевую дату
        const dateList = genreList.filter((el) => el.release_date !== null)
        if (selectedSort === 'Сначала новые') {
          sortList = dateList.sort((a, b) =>
            a.release_date < b.release_date ? 1 : -1,
          )
        } else {
          sortList = dateList.sort((a, b) =>
            a.release_date > b.release_date ? 1 : -1,
          )
        }
        sortList = [
          ...sortList,
          ...genreList.filter((el) => el.release_date === null),
        ]
      } else {
        sortList = genreList
      }
      if (!sortList.length) {
        sortList = 'not found'
      }
      setMusic(sortList)
    }
  }, [authorFilter, genreFilter, selectedSort, playlistAPI])

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
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
        />
        <MusicFilterItem
          title="жанру"
          filterList={Array.from(
            new Set(playlistAPI?.map((track) => track.genre)),
          )}
          isLoading={isLoading}
          visibleFilter={visibleFilter}
          toggleVisibleFilter={toggleVisibleFilter}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
        />
      </S.FilterSearc>
      <S.FilterSort>
        <S.FilterTitle>Сортировка:</S.FilterTitle>
        <MusicSortItem
          title="году выпуска"
          filterList={['По умолчанию', 'Сначала новые', 'Сначала старые']}
          isLoading={isLoading}
          visibleFilter={visibleFilter}
          toggleVisibleFilter={toggleVisibleFilter}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
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
  authorFilter,
  setAuthorFilter,
  genreFilter,
  setGenreFilter,
}) => {
  // фильтр
  const [selectedFilter, setSelectedFilter] = useState([])
  // выбираем критерый фильтрации
  const toggleFilter = (track) => {
    if (title === 'исполнителю') {
      if (authorFilter?.includes(track)) {
        setAuthorFilter(authorFilter.filter((e) => e !== track))
      } else {
        setAuthorFilter([...authorFilter, track])
      }
    } else if (title === 'жанру') {
      if (genreFilter?.includes(track)) {
        setGenreFilter(genreFilter.filter((e) => e !== track))
      } else {
        setGenreFilter([...genreFilter, track])
      }
    } else {
      return
    }

    // это рисует ярлычок с цифрой
    if (selectedFilter?.includes(track)) {
      setSelectedFilter(selectedFilter.filter((e) => e !== track))
    } else {
      setSelectedFilter([...selectedFilter, track])
    }
  }

  return (
    <S.FilterItem
      disabled={{ isLoading }}
      style={{ pointerEvents: isLoading && 'none' }}
    >
      <S.FilterButton
        onClick={() => toggleVisibleFilter(title)}
        className="_btn-text"
        style={{
          borderColor: visibleFilter === title ? '#9A48F1' : '',
          color: visibleFilter === title ? '#9A48F1' : '',
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

const MusicSortItem = ({
  title,
  filterList,
  isLoading,
  visibleFilter,
  toggleVisibleFilter,
  selectedSort,
  setSelectedSort,
}) => (
  <S.FilterItem
    disabled={{ isLoading }}
    style={{ pointerEvents: isLoading && 'none' }}
  >
    <S.FilterButton
      onClick={() => toggleVisibleFilter(title)}
      className="_btn-text"
      style={{
        borderColor: visibleFilter === title ? '#9A48F1' : '',
        color: visibleFilter === title ? '#9A48F1' : '',
      }}
    >
      {selectedSort}
    </S.FilterButton>
    {selectedSort !== 'По умолчанию' && <S.FilterLabel>1</S.FilterLabel>}
    {visibleFilter === title && (
      <S.FilterMenu style={{ right: '0px', left: 'auto' }}>
        <S.FilterContent>
          <S.FilterList>
            {filterList.map((track) => (
              <S.FilterText
                key={track}
                style={{
                  color: selectedSort?.includes(track) ? '#b672ff' : '',
                  fontWeight: selectedSort?.includes(track) ? '600' : '',
                }}
                onClick={() => setSelectedSort(track)}
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
