import { useState, useMemo } from 'react'
import { AppRoutes } from './routes'
import * as S from './App.styles'
import UserContext from './context'

export default function App() {
  const [userDate, setUserDate] = useState({
    login: false,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
  })

  const logInUser = (user) => {
    setUserDate({
      login: true,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    })
  }

  const logOutUser = () => {
    setUserDate({
      login: false,
      email: '',
      first_name: '',
      last_name: '',
      username: '',
    })
  }

  const сontextValue = useMemo(
    () => ({
      logInUser,
      logOutUser,
      userDate,
    }),
    [logInUser, logOutUser, userDate],
  )
  return (
    <>
      <S.GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <UserContext.Provider value={сontextValue}>
            <AppRoutes />
          </UserContext.Provider>
        </S.Container>
      </S.Wrapper>
    </>
  )
}
