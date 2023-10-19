import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as S from './NavMenu.styles'
import { logInState } from '../../store/actions/creators/authCreator'

export const NavMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Обработчик нажатия на бургер
  const [showNavMenu, setShowNavMenu] = useState(false)
  const toggleExitButton = () => {
    dispatch(logInState(null))
    localStorage.removeItem('userSkyproMusic')
    navigate('/login')
  }
  return (
    <S.MainNav>
      <S.NavLogo>
        <Link to="/">
          <S.LogoImage src="/img/logo.png" alt="logo" />
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
      <S.NavMenu style={{ visibility: showNavMenu ? 'visible' : '' }}>
        <S.MenuList>
          <S.MenuItem>
            <Link to="/" style={S.MenuLink}>
              Главное
            </Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link to="/favorites" style={S.MenuLink}>
              Мои треки
            </Link>
          </S.MenuItem>
          <S.MenuItemVisib>
            <Link to="/category/1" style={S.MenuLink}>
              Классическая музыка
            </Link>
          </S.MenuItemVisib>
          <S.MenuItemVisib>
            <Link to="/category/2" style={S.MenuLink}>
              Электронная музыка
            </Link>
          </S.MenuItemVisib>
          <S.MenuItemVisib>
            <Link to="/category/3" style={S.MenuLink}>
              Рок музыка
            </Link>
          </S.MenuItemVisib>
          <S.MenuItem>
            <Link
              to="/login"
              onClick={() => {
                toggleExitButton()
              }}
              style={S.MenuLink}
            >
              Выйти
            </Link>
          </S.MenuItem>
        </S.MenuList>
      </S.NavMenu>
    </S.MainNav>
  )
}
