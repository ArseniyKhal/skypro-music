import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import UserContext from '../../context'
import { isLoadingSelector } from '../../store/selectors/tracksSelectors'
import * as S from './Sidebar.styles'

export const Sidebar = () => {
  const { logOutUser, userDate } = useContext(UserContext)

  return (
    <S.MainSidebar>
      <S.SidebarPersonal>
        <S.SidebarPersonalName>{userDate.username}</S.SidebarPersonalName>
        <S.SidebarIcon>
          <svg
            onClick={() => {
              logOutUser()
            }}
            alt="logout"
          >
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </S.SidebarIcon>
      </S.SidebarPersonal>
      <S.SidebarBlock>
        <S.SidebarList>
          <SidebarItem
            imgUrl="img/playlist01.png"
            imgAlt={"day's playlist"}
            id={1}
          />
          <SidebarItem
            imgUrl="img/playlist02.png"
            imgAlt={"day's playlist"}
            id={2}
          />
          <SidebarItem
            imgUrl="img/playlist03.png"
            imgAlt={"day's playlist"}
            id={3}
          />
        </S.SidebarList>
      </S.SidebarBlock>
    </S.MainSidebar>
  )
}

const SidebarItem = ({ imgUrl, imgAlt, id }) => {
  const isLoading = useSelector(isLoadingSelector)
  return (
    <S.SidebarItem>
      <Link to={`/category/${id}`}>
        <S.SidebarImg src={imgUrl} alt={imgAlt} />
      </Link>
      {isLoading && <div className="skeleton" />}
    </S.SidebarItem>
  )
}
