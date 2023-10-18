import { Outlet } from 'react-router-dom'
import React, { useState } from 'react'
import * as S from './Centerblock.styles'

export const SearchContext = React.createContext(null)

export const Centerblock = () => {
  const [searchText, setSearchText] = useState([])
  return (
    <S.MainCenterblock>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <SearchContext.Provider value={searchText}>
        <Outlet />
      </SearchContext.Provider>
    </S.MainCenterblock>
  )
}

const Search = ({ searchText, setSearchText }) => (
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
