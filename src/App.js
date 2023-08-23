import './App.css'
import { useEffect, useState } from 'react'
import NavMenu from './components/NavMenu/NavMenu'
import Sidebar from './components/Sidebar/Sidebar'
import Centerblock from './components/Centerblock/Centerblock'
import BarPlayer from './components/BarPlayer/BarPlayer'
import playlistMusic from './data'
import * as S from './App.styles'

export default function App() {
  // Загрузка 5 сек
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <>
      <S.GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <S.Main>
            <NavMenu />
            <Centerblock isLoading={isLoading} playlistMusic={playlistMusic} />
            <Sidebar isLoading={isLoading} />
          </S.Main>
          <BarPlayer isLoading={isLoading} />
          <footer />
        </S.Container>
      </S.Wrapper>
    </>
  )
}
