import { useState, useEffect } from 'react'
import {
  // useDispatch,
  useSelector,
} from 'react-redux'
// import { addPlaylist } from '../../store/actions/creators/audioplayerCreator'
import { useGetTracksQuery } from '../../services/servicesApi'
import * as S from './Filter.styles'
import { playListSelector } from '../../store/selectors/audioplayerSelectors'

export const MusicFilter = ({ setMusic }) => {
  // отображение/скрытие меню фильтра
  const playlistMusic = useSelector(playListSelector)
  const [visibleFilter, setVisibleFilter] = useState(null)
  const toggleVisibleFilter = (filter) => {
    setVisibleFilter(visibleFilter === filter ? null : filter)
  }
  const { data: playlistAPI, isLoading } = useGetTracksQuery()
  const [authorFilter, setAuthorFilter] = useState([])
  const [filterSortList, setFilterSortList] = useState([])
  const [genreFilter, setGenreFilter] = useState([])
  const [dateSort, setDateSort] = useState([])

  let playlistAfterFilter = []
  if (authorFilter.length || genreFilter.length) {
    //  const [genreFilterList, setGenreFilterList] = useState([])

    let filterPlayList = []
    let filterPlayListAuthor = []
    let filterPlayListGenre = []

    // ======================= ФИЛЬТР ПО АВТОРУ ==========================
    for (let i = 0; i < authorFilter.length; i++) {
      let authorList = []
      // const authorList = authorFilter.length
      //   ? filterPlayListGenre.filter((el) => el.author === authorFilter[i])
      //   : playlistAPI.filter((el) => el.author === authorFilter[i])
      // filterPlayList = [...filterPlayList, ...authorList]
      // filterPlayListAuthor = [...filterPlayListAuthor, ...authorList]
      if (genreFilter.length) {
        console.log('фильтруем из жанра')
        authorList = playlistAPI.filter((el) => el.author === authorFilter[i])
      } else {
        console.log('фильтруем из API')
        authorList = playlistAPI.filter((el) => el.author === authorFilter[i])
      }
      filterPlayListAuthor = [...filterPlayListAuthor, ...authorList]
    }

    // ======================= ФИЛЬТР ПО ЖАНРУ ==========================
    for (let i = 0; i < genreFilter.length; i++) {
      const genreList = playlistAPI.filter((el) => el.genre === genreFilter[i])
      filterPlayListGenre = [...filterPlayListGenre, ...genreList]
    }

    filterPlayList = [...filterPlayListAuthor, ...filterPlayListGenre]
    // удаляем дубликаты треков
    playlistAfterFilter = [
      ...filterPlayList
        .reduce((map, obj) => map.set(obj.id, obj), new Map())
        .values(),
    ]
  }

  // ======================= СОРТИРОВКА ПО ДАТЕ ============================
  const [selectedSort, setSelectedSort] = useState('По умолчанию')

  if (selectedSort !== 'По умолчанию') {
    // проверка на нулевую дату
    const dateList = filterSortList.filter((el) => el.release_date !== null)
    let sortList = []
    if (selectedSort === 'Сначала новые') {
      sortList = dateList.sort((a, b) =>
        a.release_date < b.release_date ? 1 : -1,
      )
    } else {
      sortList = dateList.sort((a, b) =>
        a.release_date > b.release_date ? 1 : -1,
      )
    }
    const result = [
      ...sortList,
      ...filterSortList.filter((el) => el.release_date === null),
    ]
    playlistAfterFilter = result
  }

  useEffect(() => {
    if (
      !authorFilter.length &&
      !genreFilter.length &&
      selectedSort === 'По умолчанию'
    ) {
      // console.log('всё по 0')
      setFilterSortList(playlistAPI)
      setMusic(playlistAPI)
    } else {
      // console.log('есть какой то фильтр')
      setFilterSortList(playlistAfterFilter)
      setMusic(playlistAfterFilter)
    }
  }, [authorFilter, genreFilter, selectedSort])

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
          playlistMusic={playlistAPI}
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
          playlistMusic={playlistMusic}
          dateSort={dateSort}
          setDateSort={setDateSort}
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
  //   dateSort,
  //   setDateSort,
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
  //   dateSort,
  //   setDateSort,
  selectedSort,
  setSelectedSort,
}) => (
  // сотрировка

  //   // фильтр
  //   const [selectedFilter, setSelectedFilter] = useState([])
  //   // выбираем критерый фильтрации
  //   const toggleFilter = (track) => {
  //     if (title === 'исполнителю') {
  //       if (authorFilter?.includes(track)) {
  //         setAuthorFilter(authorFilter.filter((e) => e !== track))
  //       } else {
  //         setAuthorFilter([...authorFilter, track])
  //       }
  //     } else if (title === 'жанру') {
  //       if (genreFilter?.includes(track)) {
  //         setGenreFilter(genreFilter.filter((e) => e !== track))
  //       } else {
  //         setGenreFilter([...genreFilter, track])
  //       }
  //     } else {
  //       toggleSort(track)
  //       return
  //     }
  //   }

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
