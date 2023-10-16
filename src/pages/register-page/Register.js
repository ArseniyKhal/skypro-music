import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as S from '../login-page/LoginReg.styles'
import { registration, login } from '../../api'
import { logInState } from '../../store/actions/creators/authCreator'
import { saveUserInfoInLocalStorage } from '../login-page/Login'

export const Register = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [input2Pass, setInput2Pass] = useState('')
  const [isLoadingReg, setIsLoadingReg] = useState(false)
  const [regError, setRegError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // регистрация
  const email = inputEmail
  const password = inputPass
  const password2 = input2Pass

  const handleReg = async (e) => {
    e.preventDefault()
    try {
      if (!email) {
        setRegError('не заполнена почта')
        return
      }
      if (!password) {
        setRegError('не заполнен пароль')
        return
      }
      if (password !== password2) {
        setRegError('пароли не совпадают')
        return
      }
      setRegError('')
      setIsLoadingReg(true)
      await registration({ email, password })
      const loginData = await login({ email, password })
      dispatch(logInState(loginData))
      saveUserInfoInLocalStorage(loginData)
      navigate('/')
    } catch (error) {
      console.error(error)
      setRegError(error.message)
    } finally {
      setIsLoadingReg(false)
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
          className=" password-first"
          type="password"
          name="password"
          placeholder="Пароль"
          value={inputPass}
          onChange={(e) => setInputPass(e.target.value)}
        />
        <S.ModalInputPassword
          className=" password-double"
          type="password"
          name="password"
          placeholder="Повторите пароль"
          value={input2Pass}
          onChange={(e) => setInput2Pass(e.target.value)}
        />
        <S.ModalErrorText>{regError}</S.ModalErrorText>
        <S.ModalBtnSignupEnt
          onClick={handleReg}
          type="submit"
          disabled={isLoadingReg}
          style={{
            backgroundColor: `${isLoadingReg ? '#181818' : ''}`,
          }}
        >
          Зарегистрироваться
        </S.ModalBtnSignupEnt>
      </S.ModalFormLogin>
    </S.ModalBlock>
  )
}
