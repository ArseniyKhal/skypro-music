import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import UserContext from '../../context'
import * as S from './Sidebar.styles'
import { useGetTracksQuery } from '../../services/servicesApi'
import { logInState } from '../../store/actions/creators/authCreator'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const { logOutUser, userData } = useContext(UserContext)
  const toggleExitButton = () => {
    logOutUser()
    dispatch(logInState(false))
    localStorage.removeItem('userSkyproMusic')
  }

  return (
    <S.MainSidebar>
      <S.SidebarPersonal>
        <S.SidebarPersonalName>{userData.username}</S.SidebarPersonalName>
        <S.SidebarIcon>
          <svg
            onClick={() => {
              toggleExitButton()
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
  const { isLoading } = useGetTracksQuery()
  return (
    <S.SidebarItem>
      <Link to={`/category/${id}`}>
        <S.SidebarImg src={imgUrl} alt={imgAlt} />
      </Link>
      {isLoading && <div className="skeleton" />}
    </S.SidebarItem>
  )
}
