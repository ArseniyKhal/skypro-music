import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { currentTrackSelector } from '../../store/selectors/audioplayerSelectors'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { logInState } from '../../store/actions/creators/authCreator'
import * as S from '../../App.styles'

// Задачи:
// сделать время на прогрессе при наведении
// нарисовать ОШИБКА ЗАГРУЗКИ ТРЕКОВ
// отладить адаптивность
// не подключаются шрифты на страницах login и reg..

export const Main = () => {
  const trackInPlayer = useSelector(currentTrackSelector)
  const userInfo = JSON.parse(localStorage.getItem('userSkyproMusic'))
  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) {
      dispatch(logInState(userInfo))
    }
  }, [])
  return (
    <>
      <S.Main>
        <NavMenu />
        <Centerblock />
        <Sidebar />
      </S.Main>
      {trackInPlayer && <BarPlayer />}
    </>
  )
}
