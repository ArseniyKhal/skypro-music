import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../api'
import * as S from './Login.styles'

// при клике по логотипу, куда должны попадать???

export const Login = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [getLoginError, setLoginError] = useState(null)

  // авторизуемся
  const handleEnter = async () => {
    const email = inputEmail
    const password = inputPass
    try {
      setLoginError('')
      const user = await login({ email, password })
      console.log(user)
    } catch (err) {
      console.error(err)
      console.log(getLoginError)
      setLoginError(`Не удалось... Ошибка: ${err.message}`)
    }

    //  login().then()
    //  localStorage.setItem('user', 'user')
  }
  return (
    <S.ModalBlock>
      <S.ModalFormLogin action="#">
        <a href="../">
          <S.ModalLogo>
            <img src="../img/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </a>
        <S.ModalInputLogin
          type="text"
          name="login"
          placeholder="Почта"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <S.ModalInputPassword
          type="password"
          name="password"
          placeholder="Пароль"
          value={inputPass}
          onChange={(e) => setInputPass(e.target.value)}
        />
        <S.ModalBtnEnter>
          <Link
            to="/"
            onClick={() => {
              handleEnter()
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
