import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../api'
import * as S from './LoginReg.styles'
import { logInState } from '../../store/actions/creators/authCreator'
import { themeSelector } from '../../store/selectors/authSelectors'

// логин: yellow@cat.ru			 пароль: 8symbol!

// запись юзера и токена в localStorage
export const saveUserInfoInLocalStorage = (loginData) => {
  const userInfo = JSON.stringify({
    email: loginData.email,
    first_name: loginData.first_name,
    last_name: loginData.last_name,
    username: loginData.username,
    id: loginData.id,
    refresh: loginData.refresh,
    access: loginData.access,
    themeDark: true,
  })
  localStorage.setItem('userSkyproMusic', userInfo)
}

export const Login = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [loginError, setLoginError] = useState('')
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
      const loginData = await login({ email, password })
      dispatch(logInState(loginData))
      saveUserInfoInLocalStorage(loginData)
      navigate('/')
    } catch (error) {
      console.error(error)
      setLoginError(error.message)
    } finally {
      setIsLoadingLogin(false)
    }
  }
  const theme = useSelector(themeSelector)
  return (
    <S.ModalBlock>
      <S.ModalFormLogin>
        <a href="../">
          <S.ModalLogo>
            <img
              src={`/img/logo${theme === 'dark' ? '_modal' : ''}.png`}
              alt="logo"
            />
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
          <Link style={{ color: '#000' }} to="/register">
            {' '}
            Зарегистрироваться{' '}
          </Link>
        </S.ModalBtnSignup>
      </S.ModalFormLogin>
    </S.ModalBlock>
  )
}
