import { useSelector, useDispatch } from 'react-redux'
import { currentTrackSelector } from '../../store/selectors/audioplayerSelectors'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import { Centerblock } from '../../components/Centerblock/Centerblock'
import { logInState, setTokens } from '../../store/actions/creators/authCreator'
import * as S from '../../App.styles'

// Задачи:
// сделать правильное отображение времени трека в списке
// сделать время на прогрессе при наведении
// нарисовать ОШИБКА ЗАГРУЗКИ ТРЕКОВ
// отладить адаптивность
// неправильно отображение фильтра по дате
// getPlaylistError надо?
// если теперь есть данные о пользавотеле в сторе, нежен ли контекст?
// надо ли чистить токены при logout?
// как получить функцию без isSuccess????
// почему функция login не читает пропсы напрямую из стейта ???
// не подключаются шрифты на страницах login и reg..

export const Main = () => {
  const trackInPlayer = useSelector(currentTrackSelector)
  const userInfo = JSON.parse(localStorage.getItem('userSkyproMusic'))
  const dispatch = useDispatch()
  if (userInfo) {
    dispatch(logInState(userInfo))
    dispatch(setTokens(userInfo))
  }
  //   const [getPlaylistError, setGetPlaylistError] = useState(null)

  // загрузка треков с API
  //   const fetchTracks = async () => {
  //     try {
  //       setGetPlaylistError('')
  //		const tracks = await getPlaylist()
  //       if (playlist) {
  //       }
  //     } catch (error) {
  //       console.error(error)
  //       setGetPlaylistError(
  //         `Не удалось загрузить плейлист, попробуйте позже. Ошибка: ${error.message}`,
  //       )
  //     }
  //     //  finally {    }
  //   }

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
