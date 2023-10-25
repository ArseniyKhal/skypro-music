import { Outlet } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as S from './Centerblock.styles'
import { themeSelector } from '../../store/selectors/authSelectors'

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

const Search = ({ searchText, setSearchText }) => {
  const theme = useSelector(themeSelector)

  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use
          xlinkHref={`/img/icon/sprite.svg#icon-search${
            theme === 'dark' ? '' : '_black'
          }`}
        />
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
