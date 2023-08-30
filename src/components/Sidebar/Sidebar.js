import { Link } from 'react-router-dom'
import * as S from './Sidebar.styles'

export default function Sidebar({ isLoading }) {
  return (
    <S.MainSidebar>
      <S.SidebarPersonal>
        <S.SidebarPersonalName>Sergey.Ivanov</S.SidebarPersonalName>
        <S.SidebarIcon>
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </S.SidebarIcon>
      </S.SidebarPersonal>
      <S.SidebarBlock>
        <S.SidebarList>
          <SidebarItem
            imgUrl="img/playlist01.png"
            imgAlt={"day's playlist"}
            isLoading={isLoading}
            id={1}
          />
          <SidebarItem
            imgUrl="img/playlist02.png"
            imgAlt={"day's playlist"}
            isLoading={isLoading}
            id={2}
          />
          <SidebarItem
            imgUrl="img/playlist03.png"
            imgAlt={"day's playlist"}
            isLoading={isLoading}
            id={3}
          />
        </S.SidebarList>
      </S.SidebarBlock>
    </S.MainSidebar>
  )
}

function SidebarItem({ imgUrl, imgAlt, isLoading, id }) {
  return (
    <S.SidebarItem>
      <Link to={`/category/${id}`}>
        <S.SidebarImg src={imgUrl} alt={imgAlt} />
      </Link>
      {isLoading && <div className="skeleton" />}
    </S.SidebarItem>
  )
}
