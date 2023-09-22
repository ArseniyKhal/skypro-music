// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as S from '../login-page/LoginReg.styles'
import { registration } from '../../api'

export const Register = () => {
  //   const navigate = useNavigate()
  //   const handleBackButtonClick = () => {
  //     navigate('/login', { replace: true })
  //   }
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [input2Pass, setInput2Pass] = useState('')

  const handleReg = async () => {
    const email = inputEmail
    const password = inputPass
    await registration({ email, password })
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
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })

    // const email = inputEmail
    // const password = inputPass
    // try {
    //   setLoginError('')
    //   await login({ email, password })
    // 	 .then((response) => {
    // 		if (!response.ok) {
    // 		  switch (response.status) {
    // 			 case 400:
    // 				throw new Error('bad request')
    // 			 case 401:
    // 				throw new Error('Unauthorixed')
    // 			 case 404:
    // 				throw new Error('Not found')
    // 			 case 500:
    // 				throw new Error('Internal server error')
    // 			 default:
    // 		  }
    // 		}
    // 		return response.json()
    // 	 })
    // 	 .then((user) => {
    // 		//  localStorage.setItem('email', user.email)
    // 		//  localStorage.setItem('username', user.username)
    // 		logInUser(user)
    // 		localStorage.setItem('user', 'user')
    // 	 })
    // } catch (err) {
    //   console.error(err)
    //   console.log(getLoginError)
    //   setLoginError(`Не удалось... Ошибка: ${err.message}`)
    // }
    // //  login().then()
    // //  localStorage.setItem('user', 'user')
  }

  return (
    //  <S.CenterBlock>
    //    <h1>Страница регистрации</h1>
    //    <button onClick={handleBackButtonClick} style={S.BtnLogin} type="button">
    //      Назад
    //    </button>
    //  </S.CenterBlock>

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
        <S.ModalBtnSignupEnt>
          <Link
            to="/"
            onClick={() => {
              handleReg()
            }}
          >
            Зарегистрироваться
          </Link>
        </S.ModalBtnSignupEnt>
      </S.ModalFormLogin>
    </S.ModalBlock>
  )
}
