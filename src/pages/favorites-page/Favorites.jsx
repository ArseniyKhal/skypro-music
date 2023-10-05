import { useSelector } from 'react-redux'
import { Playlist } from '../../components/Playlist/Playlist'
import { isLoadingSelector } from '../../store/selectors/tracksSelectors'

export const Favorites = () => {
  const isLoading = useSelector(isLoadingSelector)

  return isLoading ? <h3>Загрузка</h3> : <Playlist />
}
