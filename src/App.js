import AppRoutes from './routes'
import * as S from './App.styles'

export default function App() {
  return (
    <>
      <S.GlobalStyle />
      <div className="App">
        <S.Wrapper>
          <S.Container>
            <AppRoutes />
          </S.Container>
        </S.Wrapper>
      </div>
    </>
  )
}
