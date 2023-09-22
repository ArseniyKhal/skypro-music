import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../api'
import * as S from './Login.styles'
import UserContext from '../../context'

export const UserData = {
  email: 'yellow@cat.ru',
  password: '8symbol!',
  username: 'yellowCat',
  isUserLogin: false,
}

// при клике по логотипу, куда должны попадать???

export const Login = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [getLoginError, setLoginError] = useState(null)
  const { logInUser } = useContext(UserContext)

  // авторизуемся
  const handleEnter = async () => {
    const email = inputEmail
    const password = inputPass
    try {
      setLoginError('')
      await login({ email, password })
        .then((response) => {
          if (!response.ok) {
            switch (response.status) {
              case 400:
                throw new Error('bad request')
              case 401:
                throw new Error('Unauthorixed')
              case 404:
                throw new Error('Not found')
              case 500:
                throw new Error('Internal server error')
              default:
            }
          } else {
            logInUser()
          }
          return response.json()
        })
        .then((user) => {
          //  localStorage.setItem('email', user.email)
          //  localStorage.setItem('username', user.username)

          console.log(user)

          localStorage.setItem('user', 'user')
        })
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
