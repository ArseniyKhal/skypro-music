import * as S from './Centerblock.styles'
import { MusicFilter } from '../MusicFilter/MusicFilter'
import { Playlist } from '../Playlist/Playlist'

export const Centerblock = ({ tracks, isLoading, tetle }) => (
  <S.MainCenterblock>
    <Search />
    <S.CenterblockH2>{tetle}</S.CenterblockH2>
    <MusicFilter />
    <Playlist tracks={tracks} isLoading={isLoading} />
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
