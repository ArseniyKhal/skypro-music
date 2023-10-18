import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as S from './Sidebar.styles'
import { useGetTracksQuery } from '../../services/servicesApi'
import { logInState } from '../../store/actions/creators/authCreator'

import { nameUserSelector } from '../../store/selectors/authSelectors'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector(nameUserSelector)

  const toggleExitButton = () => {
    dispatch(logInState(null))
    localStorage.removeItem('userSkyproMusic')
    navigate('/login')
  }

  return (
    <S.MainSidebar>
      <S.SidebarPersonal>
        <S.SidebarPersonalName>{userName}</S.SidebarPersonalName>
        <S.SidebarIcon>
          <svg
            onClick={() => {
              toggleExitButton()
            }}
            alt="logout"
          >
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </S.SidebarIcon>
      </S.SidebarPersonal>
      <S.SidebarBlock>
        <S.SidebarList>
          <SidebarItem
            imgUrl="/img/playlist01.png"
            imgAlt={"day's playlist"}
            id={1}
          />
          <SidebarItem
            imgUrl="/img/playlist02.png"
            imgAlt={"day's playlist"}
            id={2}
          />
          <SidebarItem
            imgUrl="/img/playlist03.png"
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
