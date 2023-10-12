import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../api'
import * as S from './LoginReg.styles'
import { setTokens, logInState } from '../../store/actions/creators/authCreator'
import UserContext from '../../context'

// логин: yellow@cat.ru			 пароль: 8symbol!

export const Login = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [loginError, setLoginError] = useState('')
  const { logInUser } = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // авторизуемся
  const email = inputEmail
  const password = inputPass

  const handleEnter = async (e) => {
    e.preventDefault()
    try {
      if (!email) {
        setLoginError('не заполнена почта')
        return
      }
      if (!password) {
        setLoginError('не заполнен пароль')
        return
      }
      setLoginError('')
      setIsLoadingLogin(true)
      await login({ email, password })
        .then(async ({ loginRes, tokenRes }) => {
          if (loginRes.status === 200) {
            logInUser({ login: true })
            localStorage.setItem('userSkyproMusic', true)
            navigate('/')
          }
          const user = await loginRes.json()
          const token = await tokenRes.json()
          return { user, token }
        })
        .then(({ user, token }) => {
          setLoginError(user.detail)
          // запись юзера в context
          logInUser(user)
          // запись юзера и токена в state
          dispatch(logInState(user))
          dispatch(setTokens(token))
          // запись юзера и токена в localStorage
          const userInfo = JSON.stringify({
            email,
            password,
            username: user.username,
            id: user.id,
            refresh: token.refresh,
          })
          localStorage.setItem('userSkyproMusic', userInfo)
        })
    } catch (error) {
      console.error(error)
      setLoginError(`Ошибка: ${error.message}`)
    } finally {
      setIsLoadingLogin(false)
    }
  }

  return (
    <S.ModalBlock>
      <S.ModalFormLogin>
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
        <S.ModalBtnEnter
          onClick={handleEnter}
          type="submit"
          disabled={isLoadingLogin}
          style={{
            backgroundColor: `${isLoadingLogin ? '#181818' : ''}`,
          }}
        >
          Войти
        </S.ModalBtnEnter>
        <S.ModalBtnSignup disabled={isLoadingLogin}>
          <Link to="/register"> Зарегистрироваться </Link>
        </S.ModalBtnSignup>
      </S.ModalFormLogin>
    </S.ModalBlock>
  )
}
