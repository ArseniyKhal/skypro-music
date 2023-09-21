import { Link } from 'react-router-dom'
import * as S from './Login.styles'

export const Login = () => {
  const handleLogin = () => {
    localStorage.setItem('user', 'user')
  }
  return (
    <S.ModalBlock>
      <S.ModalFormLogin action="#">
        <a href="../">
          <S.ModalLogo>
            <img src="../img/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </a>
        <S.ModalInputLogin type="text" name="login" placeholder="Почта" />
        <S.ModalInputPassword
          type="password"
          name="password"
          placeholder="Пароль"
        />
        <S.ModalBtnEnter>
          <Link
            to="/"
            onClick={() => {
              handleLogin()
            }}
          >
            Войти
          </Link>
        </S.ModalBtnEnter>
        <S.ModalBtnSignup>
          <Link to="/register"> Зарегистрироваться </Link>
        </S.ModalBtnSignup>
      </S.ModalFormLogin>
    </S.ModalBlock>
  )
}
