import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as S from './NavMenu.styles'

export default function NavMenu() {
  // Обработчик нажатия на бургер
  const [showNavMenu, setShowNavMenu] = useState(false)

  return (
    <S.MainNav>
      <S.NavLogo>
        <S.LogoImage src="img/logo.png" alt="logo" />
      </S.NavLogo>
      <S.NavBurger
        onClick={() => {
          setShowNavMenu(!showNavMenu)
        }}
        type="button"
      >
        <S.BurgerLine />
        <S.BurgerLine />
        <S.BurgerLine />
      </S.NavBurger>
      {showNavMenu && (
        <S.NavMenu>
          <S.MenuList>
            <S.MenuItem>
              <Link to="/" style={S.MenuLink}>
                Главное
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to="/favorites" style={S.MenuLink}>
                Мой плейлист
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to="/login" style={S.MenuLink}>
                Войти
              </Link>
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      )}
    </S.MainNav>
  )
}
