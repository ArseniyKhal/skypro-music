import { AppRoutes } from './routes'
import * as S from './App.styles'

export default function App() {
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
