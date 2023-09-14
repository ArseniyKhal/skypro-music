import { Link } from 'react-router-dom'
import * as S from '../../App.styles'
// import * as Style from './Login.styles'

export const Login = () => {
  const handleLogin = () => {
    localStorage.setItem('user', 'user')
  }
  return (
    <S.CenterBlock>
      <h1>Страница логина</h1>
      <Link
        style={S.BtnLogin}
        to="/"
        onClick={() => {
          handleLogin()
        }}
      >
        Войти
      </Link>
      <Link to="/register" style={{ textDecoration: 'underline' }}>
        Перейти к регистрации
      </Link>
    </S.CenterBlock>
  )
}
