import { Outlet } from 'react-router-dom'
import * as S from './Centerblock.styles'

export const Centerblock = () => (
  <S.MainCenterblock>
    <Search />
    <Outlet />
  </S.MainCenterblock>
)

const Search = () => (
  <S.CenterblockSearch>
    <S.SearchSvg>
      <use xlinkHref="img/icon/sprite.svg#icon-search" />
    </S.SearchSvg>
    <S.SearchText type="search" placeholder="Поиск" name="search" />
  </S.CenterblockSearch>
)
