import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as S from './NavMenu.styles'

export function NavMenu() {
  // Обработчик нажатия на бургер
  const [showNavMenu, setShowNavMenu] = useState(false)

  return (
    <S.MainNav>
      <S.NavLogo>
        <Link to="/">
          <S.LogoImage src="img/logo.png" alt="logo" />
        </Link>
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
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem('user')
                }}
                style={S.MenuLink}
              >
                Выйти
              </Link>
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      )}
    </S.MainNav>
  )
}
