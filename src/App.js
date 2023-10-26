import './index.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { themeSelector } from './store/selectors/authSelectors'
import { AppRoutes } from './routes'
import * as S from './App.styles'

export default function App() {
  const theme = useSelector(themeSelector)
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])
  return (
    <>
      <S.GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <AppRoutes />
        </S.Container>
      </S.Wrapper>
    </>
  )
}
