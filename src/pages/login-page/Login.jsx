import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../api'
import * as S from './LoginReg.styles'
import UserContext from '../../context'

// авторизация происхдит только после повторного нажатия
// .. причем авторизация происходит с любым логином и паролем (не зависимо от status 200)
// почему напрямую не передаются значения стейта inputEmail и inputPass ??
// вообще не пойму когда сработает блок catch ??
// почему функция login не читает пропсы напрямую из стейта ???
// аналогично предыдущему вопросу-почему AUDIO не хочет напрямую читать URL из стейта ???
// не подключаются шрифты на страницах login и reg..
// при клике по логотипу на страницах login и reg, куда должны попадать???

// логин: yellow@cat.ru
// пароль: 8symbol!

export const Login = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [loginError, setLoginError] = useState('')
  const { logInUser } = useContext(UserContext)

  // авторизуемся
  const email = inputEmail
  const password = inputPass

  const handleEnter = async () => {
    try {
      if (!email) {
        setLoginError('не заполнена почта')
        console.log('нет почты')
        return
      }
      if (!password) {
        setLoginError('не заполнен пароль')
        console.log('нет пароля')
        return
      }
      setLoginError('')
      setIsLoadingLogin(true)
      await login({ email, password })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log('ok')
            logInUser({ login: true })
          }
          return response.json()
        })
        .then((user) => {
          setLoginError(user.detail)
          logInUser(user)

          console.log(user.detail)
        })
    } catch (error) {
      console.error(error)
      setLoginError(`Не удалось... Ошибка: ${error.message}`)
      console.log(loginError)
    } finally {
      setIsLoadingLogin(false)
    }
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
        <S.ModalErrorText>{loginError}</S.ModalErrorText>
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
        <S.ModalBtnSignup disabled={isLoadingLogin}>
          <Link to="/register"> Зарегистрироваться </Link>
        </S.ModalBtnSignup>
      </S.ModalFormLogin>
    </S.ModalBlock>
  )
}
