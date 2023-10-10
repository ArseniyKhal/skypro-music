import { useState, useMemo } from 'react'
import { AppRoutes } from './routes'
import * as S from './App.styles'
import UserContext from './context'

export default function App() {
  const [userData, setUserData] = useState({
    login: false,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
  })

  const logInUser = (user) => {
    setUserData({
      login: true,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    })
  }

  const logOutUser = () => {
    setUserData({
      login: false,
      email: '',
      first_name: '',
      last_name: '',
      username: '',
    })
  }

  const contextValue = useMemo(
    () => ({
      logInUser,
      logOutUser,
      userData,
    }),
    [logInUser, logOutUser, userData],
  )
  return (
    <>
      <S.GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <UserContext.Provider value={contextValue}>
            <AppRoutes />
          </UserContext.Provider>
        </S.Container>
      </S.Wrapper>
    </>
  )
}
