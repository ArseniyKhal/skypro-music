export default function Nav() {
  function handleClick() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.toggle('show-menu')
  }

  return (
    <nav className="main__nav nav">
      <div className="nav__logo logo">
        <img className="logo__image" src="img/logo.png" alt="logo" />
      </div>
      <button
        className="nav__burger burger"
        onClick={handleClick}
        type="button"
      >
        <span className="burger__line" />
        <span className="burger__line" />
        <span className="burger__line" />
      </button>
      <div className="nav__menu menu" id="nav-menu">
        <ul className="menu__list">
          <li className="menu__item">
            <a href="/#" className="menu__link">
              Главное
            </a>
          </li>
          <li className="menu__item">
            <a href="/#" className="menu__link">
              Мой плейлист
            </a>
          </li>
          <li className="menu__item">
            <a href="../signin.html" className="menu__link">
              Войти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
