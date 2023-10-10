import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as S from './NavMenu.styles'
import UserContext from '../../context'
import { logInState } from '../../store/actions/creators/authCreator'

export const NavMenu = () => {
  const dispatch = useDispatch()

  // Обработчик нажатия на бургер
  const [showNavMenu, setShowNavMenu] = useState(false)
  const { logOutUser } = useContext(UserContext)
  const toggleExitButton = () => {
    logOutUser()
    dispatch(logIn(false))
  }
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
                  toggleExitButton()
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
