import { useState, useMemo } from 'react'
import { AppRoutes } from './routes'
import * as S from './App.styles'
import UserContext from './context'

export default function App() {
  const [isLogin, setIsLogin] = useState(false)

  const logInUser = () => {
    setIsLogin(true)
  }

  const logOutUser = () => {
    setIsLogin(true)
  }

  const сontextValue = useMemo(
    () => ({
      logInUser,
      logOutUser,
      isLogin,
    }),
    [logInUser, logOutUser, isLogin],
  )

  return (
    <>
      <S.GlobalStyle />
      <div className="App">
        <S.Wrapper>
          <S.Container>
            <UserContext.Provider value={сontextValue}>
              <AppRoutes />
            </UserContext.Provider>
          </S.Container>
        </S.Wrapper>
      </div>
    </>
  )
}
