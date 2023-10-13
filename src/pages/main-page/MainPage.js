import { useSelector, useDispatch } from 'react-redux'
import { currentTrackSelector } from '../../store/selectors/audioplayerSelectors'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { logInState } from '../../store/actions/creators/authCreator'
import * as S from '../../App.styles'

// Задачи:
// сделать правильное отображение времени трека в списке
// сделать время на прогрессе при наведении
// нарисовать ОШИБКА ЗАГРУЗКИ ТРЕКОВ
// отладить адаптивность
// неправильно отображение фильтра по дате
// если теперь есть данные о пользавотеле в сторе, нежен ли контекст?
// надо ли чистить токены при logout?
// почему функция login не читает пропсы напрямую из стейта ???
// не подключаются шрифты на страницах login и reg..

export const Main = () => {
  const trackInPlayer = useSelector(currentTrackSelector)
  const userInfo = JSON.parse(localStorage.getItem('userSkyproMusic'))
  const dispatch = useDispatch()
  if (userInfo) {
    dispatch(logInState(userInfo))
  }

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
