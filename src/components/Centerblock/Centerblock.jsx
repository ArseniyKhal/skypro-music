import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import * as S from './Centerblock.styles'
// import { useGetTracksQuery } from '../../services/servicesApi'

export const Centerblock = () => (
  <S.MainCenterblock>
    <Search />
    <Outlet />
  </S.MainCenterblock>
)

const Search = () => {
  //   const { data: playlistAPI, isLoading } = useGetTracksQuery()
  const [searchText, setSearchText] = useState([])
  console.log(searchText)
  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </S.SearchSvg>
      <S.SearchText
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value)
        }}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </S.CenterblockSearch>
  )
}
