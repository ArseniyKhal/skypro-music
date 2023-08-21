export default function Sidebar({ isLoading }) {
  return (
    <div className="main__sidebar sidebar">
      <div className="sidebar__personal">
        <p className="sidebar__personal-name">Sergey.Ivanov</p>
        <div className="sidebar__icon">
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <div className="sidebar__block">
        <div className="sidebar__list">
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
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ imgUrl, imgAlt, isLoading }) {
  return (
    <div className="sidebar__item">
      <a className="sidebar__link" href="/#">
        <img className="sidebar__img" src={imgUrl} alt={imgAlt} />
      </a>
      {isLoading && <div className="skeleton" />}
    </div>
  )
}
