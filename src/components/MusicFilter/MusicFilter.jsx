import { useState } from 'react'
import { useGetTracksQuery } from '../../services/servicesApi'
import * as S from './Filter.styles'

export const MusicFilter = () => {
  const [visibleFilter, setvisibleFilter] = useState(null)
  const { data } = useGetTracksQuery()
  const playlistMusic = data
  const toggleVisibleFilter = (filter) => {
    setvisibleFilter(visibleFilter === filter ? null : filter)
  }
  return (
    <S.CenterblockFilter>
      <S.FilterTitle>Искать по:</S.FilterTitle>
      <MusicFilterItem
        title="исполнителю"
        filterList={Array.from(
          new Set(playlistMusic?.map((track) => track.author)),
        )}
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
      />
      <MusicFilterItem
        title="году выпуска"
        filterList={Array.from(
          new Set(playlistMusic?.map((track) => track.release_date)),
        )}
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
      />
      <MusicFilterItem
        title="жанру"
        filterList={Array.from(
          new Set(playlistMusic?.map((track) => track.genre)),
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
  const { isLoading } = useGetTracksQuery()

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
