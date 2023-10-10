import { useSelector } from 'react-redux'
import { currentTrackSelector } from '../../store/selectors/audioplayerSelectors'
import { NavMenu } from '../../components/NavMenu/NavMenu'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BarPlayer } from '../../components/BarPlayer/BarPlayer'
import * as S from '../../App.styles'
import { Centerblock } from '../../components/Centerblock/Centerblock'

// Задачи:
// сделать правильное отображение времени трека в списке
// сделать время на прогрессе при наведении
// нарисовать ОШИБКА ЗАГРУЗКИ ТРЕКОВ
// При обновлении страница разлогинивается
// отладить адаптивность
// неправильно отображение фильтра по дате
// getPlaylistError надо?
// как через return передать две переменные?
// если теперь есть данные о пользавотеле в сторе, нежен ли контекст?
// надо ли чистить токены при при logout?

export const Main = () => {
  const trackInPlayer = useSelector(currentTrackSelector)
  //   console.log(trackInPlayer)
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
