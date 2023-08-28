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
          />
          <SidebarItem
            imgUrl="img/playlist02.png"
            imgAlt={"day's playlist"}
            isLoading={isLoading}
          />
          <SidebarItem
            imgUrl="img/playlist03.png"
            imgAlt={"day's playlist"}
            isLoading={isLoading}
          />
        </S.SidebarList>
      </S.SidebarBlock>
    </S.MainSidebar>
  )
}

function SidebarItem({ imgUrl, imgAlt, isLoading }) {
  return (
    <S.SidebarItem>
      <S.SidebarLink href="/#">
        <S.SidebarImg src={imgUrl} alt={imgAlt} />
      </S.SidebarLink>
      {isLoading && <div className="skeleton" />}
    </S.SidebarItem>
  )
}
